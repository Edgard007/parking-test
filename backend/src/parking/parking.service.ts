import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';

// ==> DTO
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';

// ==> Entity
import { Parking } from './entities/parking.entity';

@Injectable()
export class ParkingService {
  constructor(
    @InjectModel(Parking.name)
    private readonly parkingModel: Model<Parking>,
    private readonly commonServ: CommonService,
  ) {}

  async create(dto: CreateParkingDto) {
    // Check if there is an active record
    const check = await this.findOne(dto?.numPlaca, false);

    if (check && check?.endDate === '') {
      throw new BadRequestException('There is an active registry');
    }

    try {
      // ==> Save record
      const save: CreateParkingDto = { ...dto, endDate: '' };
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

    try {
      await parking.updateOne(dto);
      return { ...parking.toJSON(), ...dto };
    } catch (err) {
      this.commonServ.handleExceptions(err);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.parkingModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new NotFoundException(`Parking with ID "${id} not found"`);
  }
}
