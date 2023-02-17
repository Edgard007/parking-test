import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  handleExceptions(err: any) {
    if (err?.code === 11000) {
      throw new BadRequestException(
        `Record exists in DB ${JSON.stringify(err?.keyValue || '')}`,
      );
    }

    console.error('|| ==> Error <== ||', err);
    throw new InternalServerErrorException('Check server logs');
  }
}
