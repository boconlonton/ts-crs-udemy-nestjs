import {
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { CardDto } from './card.dto';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;
}
