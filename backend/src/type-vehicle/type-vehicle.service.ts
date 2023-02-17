import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

// ==> Entity
import { TypeVehicle } from './entities/type-vehicle.entity';

// ==> DTO
import { CreateTypeVehicleDto } from './dto/create-type-vehicle.dto';
import { UpdateTypeVehicleDto } from './dto/update-type-vehicle.dto';

// ==> Services
import { CommonService } from 'src/common/common.service';

@Injectable()
export class TypeVehicleService {
  constructor(
    @InjectModel(TypeVehicle.name)
    private readonly typeVehicleModel: Model<TypeVehicle>,
    private readonly commonServ: CommonService,
  ) {}

  findAll() {
    return this.typeVehicleModel
      .find()
      .sort({
        no: 1,
      })
      .select('-__v');
  }

  async findOne(term: string, exception: boolean = true) {
    let record: TypeVehicle;

    if (isValidObjectId(term)) {
      record = await this.typeVehicleModel.findById(term);
    }
    if (!record && exception) throw new NotFoundException();

    return record;
  }

  async create(dto: CreateTypeVehicleDto) {
    try {
      const record = await this.typeVehicleModel.create(dto);
      return record;
    } catch (err) {
      this.commonServ.handleExceptions(err);
    }
  }

  async update(term: string, dto: UpdateTypeVehicleDto) {
    const record = await this.findOne(term);
    try {
      await record.updateOne(dto);
      return { ...record.toJSON(), ...dto };
    } catch (err) {
      this.commonServ.handleExceptions(err);
    }
  }
}
