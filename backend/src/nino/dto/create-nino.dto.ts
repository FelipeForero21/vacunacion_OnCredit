import { IsNotEmpty, IsString, IsDateString, IsEnum, IsInt, IsNumber } from 'class-validator';

export class CreateNinoDto {
    @IsNotEmpty()
    @IsString()
    nombres: string;

    @IsNotEmpty()
    @IsDateString()
    fechaNacimiento: Date;

    @IsNotEmpty()
    @IsEnum(['Masculino', 'Femenino'])
    genero: 'Masculino' | 'Femenino';

    @IsNotEmpty()
    @IsNumber()
    tarjetaIdentidad: string; 

    @IsNotEmpty()
    @IsInt()
    municipioId: number;
}
