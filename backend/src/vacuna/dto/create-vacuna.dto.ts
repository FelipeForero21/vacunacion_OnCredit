import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateVacunaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  edadMaxima: number;
}
