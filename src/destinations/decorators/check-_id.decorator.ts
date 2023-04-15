import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import mongoose from 'mongoose';

@ValidatorConstraint({
  name: 'IsIdValid',
  async: true,
})
@Injectable()
export class IsIdValid implements ValidatorConstraintInterface {
  async validate(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID is not valid');
    }
    return true;
  }
}
