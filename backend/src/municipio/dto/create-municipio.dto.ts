import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateMunicipioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsInt()
  departamentoId: number;
}
