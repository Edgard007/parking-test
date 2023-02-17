import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

// ==> Entity
import { Vehicle } from './entities/vehicle.entity';

// ==> DTO
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

// ==> Services
import { CommonService } from 'src/common/common.service';
import { TypeVehicleService } from 'src/type-vehicle/type-vehicle.service';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<Vehicle>,
    private readonly commonServ: CommonService,
    private readonly typeVehicleServ: TypeVehicleService,
  ) {}

  findAll() {
    return this.vehicleModel
      .find()
      .sort({
        no: 1,
      })
      .select('-__v');
  }

  async findOne(term: string, exception: boolean = true) {
    let record: Vehicle;

    if (isValidObjectId(term)) {
      record = await this.vehicleModel.findById(term);
    } else record = await this.vehicleModel.findOne({ numPlaca: term });

    if (!record && exception) throw new NotFoundException();

    return record;
  }

  async create(dto: CreateVehicleDto) {
    // Search vehicle type
    await this.searchTypeVeh(dto?.type);

    try {
      const record = await this.vehicleModel.create(dto);
      return record;
    } catch (err) {
      this.commonServ.handleExceptions(err);
    }
  }

  async update(term: string, dto: UpdateVehicleDto) {
    const record = await this.findOne(term);

    // Search vehicle type
    const type = await this.typeVehicleServ.findOne(dto?.type, false);
    if (!type) {
      throw new NotFoundException(
        `Type vehicle with ID '${dto?.type}' not found`,
      );
    }

    try {
      await record.updateOne(dto);
      return { ...record.toJSON(), ...dto };
    } catch (err) {
      this.commonServ.handleExceptions(err);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.vehicleModel.deleteOne({
      _id: id,
    });

    if (deletedCount === 0)
      throw new NotFoundException(`Record with ID ${id} not found`);
  }

  async searchTypeVeh(_id: string) {
    const type = await this.typeVehicleServ.findOne(_id, false);
    if (!type) {
      throw new NotFoundException(`Type vehicle with ID '${_id}' not found`);
    }

    return type;
  }
}
