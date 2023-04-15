import { IsString, Validate } from 'class-validator';
import { IsIdValid } from '../decorators/check-_id.decorator';

export class IdValidDto {
  @IsString()
  @Validate(IsIdValid)
  readonly id: string;
}
