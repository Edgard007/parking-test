import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

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
  ) {}

  async create(createParkingDto: CreateParkingDto) {
    try {
      const parking = await this.parkingModel.create(createParkingDto);
      return parking;
    } catch (err) {
      this.handleExceptions(err);
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

  async findOne(term: string) {
    let parking: Parking;

    if (isValidObjectId(term)) {
      parking = await this.parkingModel.findById(term);
    } else parking = await this.parkingModel.findOne({ numPlaca: term });

    if (!parking) throw new NotFoundException();

    return parking;
  }

  async update(term: string, updateParkingDto: UpdateParkingDto) {
    const parking = await this.findOne(term);
    try {
      await parking.updateOne(updateParkingDto);
      return { ...parking.toJSON(), ...updateParkingDto };
    } catch (err) {
      this.handleExceptions(err);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.parkingModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new NotFoundException(`Parking with ID "${id} not found"`);
  }

  private handleExceptions(err: any) {
    if (err?.code === 11000) {
      throw new BadRequestException(
        `Parking exists in DB ${JSON.stringify(err?.keyValue || '')}`,
      );
    }

    console.error('|| ==> Error create <== ||', err);
    throw new InternalServerErrorException('Check server logs');
  }
}
