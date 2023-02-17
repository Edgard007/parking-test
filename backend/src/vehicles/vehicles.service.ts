import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

// ==> Entity
import { Vehicle } from './entities/vehicle.entity';

// ==> DTO
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

// ==> Services
import { CommonService } from 'src/common/common.service';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly VehicleModel: Model<Vehicle>,
    private readonly commonServ: CommonService,
  ) {}

  findAll() {
    return this.VehicleModel.find()
      .sort({
        no: 1,
      })
      .select('-__v');
  }

  async findOne(term: string) {
    let record: Vehicle;

    if (isValidObjectId(term)) {
      record = await this.VehicleModel.findById(term);
    } else record = await this.VehicleModel.findOne({ numPlaca: term });

    if (!record) throw new NotFoundException();

    return record;
  }

  async create(dto: CreateVehicleDto) {
    try {
      const pokemon = await this.VehicleModel.create(dto);
      return pokemon;
    } catch (err) {
      this.commonServ.handleExceptions(err);
    }
  }

  async update(term: string, dto: UpdateVehicleDto) {
    const record = await this.findOne(term);
    try {
      await record.updateOne(dto);
      return { ...record.toJSON(), ...dto };
    } catch (err) {
      this.commonServ.handleExceptions(err);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.VehicleModel.deleteOne({
      _id: id,
    });

    if (deletedCount === 0)
      throw new NotFoundException(`Record with ID "${id} not found"`);
  }
}
