import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import * as moment from 'moment';

import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

// ==> Services
import { CommonService } from 'src/common/common.service';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehicleService } from 'src/vehicles/vehicles.service';
import { TypeVehicleService } from 'src/type-vehicle/type-vehicle.service';

// ==> DTO
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';

// ==> Entity
import { Parking } from './entities/parking.entity';
import { TypeVehicle } from 'src/type-vehicle/entities/type-vehicle.entity';

@Injectable()
export class ParkingService {
  private readonly amount: number = 0.5;

  constructor(
    @InjectModel(Parking.name)
    private readonly parkingModel: Model<Parking>,
    private readonly commonServ: CommonService,
    private readonly vehicleServ: VehicleService,
    private readonly typeVehServ: TypeVehicleService,
  ) {}

  async create(dto: CreateParkingDto) {
    // Check if there is an active record
    const check = await this.findOne(dto?.numPlaca, false);

    if (check && check?.endDate === '') {
      throw new BadRequestException('There is an active registry');
    }

    try {
      // ==> Save record
      const save: CreateParkingDto = { ...dto, endDate: '', amount: 0 };
      const parking = await this.parkingModel.create(save);
      return parking;
    } catch (err) {
      this.commonServ.handleExceptions(err);
    }
  }

  findAll() {
    return this.parkingModel
      .find()
      .sort({
        numPlaca: 1,
      })
      .select('-__v');
  }

  async findOne(term: string, exception: boolean = true) {
    let parking: Parking;

    if (isValidObjectId(term)) {
      parking = await this.parkingModel.findById(term);
    } else parking = await this.parkingModel.findOne({ numPlaca: term });

    if (!parking && exception) throw new NotFoundException();

    return parking;
  }

  async update(term: string, dto: UpdateParkingDto) {
    const parking = await this.findOne(term);

    if (parking?.numPlaca !== dto?.numPlaca) {
      // Check for registration with the same license plate number
      const check = await this.findOne(dto?.numPlaca, false);

      if (check) {
        throw new BadRequestException('There is an active registry');
      }
    }

    // ==> Search in registered vehicles
    const vehicle: Vehicle = await this.vehicleServ.findOne(
      dto?.numPlaca,
      false,
    );

    let type: TypeVehicle;
    if (vehicle) {
      // Search vehicle type
      type = await this.vehicleServ.searchTypeVeh(vehicle?.type);
    }

    try {
      let cal: number;
      if (dto?.endDate) {
        // ==> Calcule amount
        const amount = !type ? this.amount : type?.amount;
        cal = this.calculate(amount, dto?.startDate, dto?.endDate);
      }

      const payload: UpdateParkingDto = {
        ...dto,
        amount: cal || 0,
      };

      await parking.updateOne(payload);
      return { ...parking.toJSON(), ...payload };
    } catch (err) {
      this.commonServ.handleExceptions(err);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.parkingModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new NotFoundException(`Parking with ID ${id} not found`);
  }

  calculate(amount: number, start: string, end: string) {
    const s = moment(start, 'DD/MM/YYYY HH:mm');
    const e = moment(end, 'DD/MM/YYYY HH:mm');

    const diff = e.diff(s, 'minutes');
    return diff <= 0 ? 0 : diff * amount;
  }
}
