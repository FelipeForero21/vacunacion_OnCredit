import { IsNotEmpty, IsInt, IsDateString, IsString } from 'class-validator';

export class AplicarVacunaDto {
  @IsNotEmpty()
  @IsInt()
  ninoId: number;

  @IsNotEmpty()
  @IsInt()
  vacunaId: number;

  @IsNotEmpty()
  @IsDateString()
  fechaAplicacion: string; 
}
