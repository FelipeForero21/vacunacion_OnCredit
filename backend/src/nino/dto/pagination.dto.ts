import { IsOptional, IsPositive, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {

    @IsOptional()
    @IsInt({ message: 'El número de página debe ser un entero.' })
    @IsPositive({ message: 'El número de página debe ser positivo.' })
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @IsInt({ message: 'El límite debe ser un entero.' })
    @IsPositive({ message: 'El límite debe ser positivo.' })
    @Type(() => Number)
    limit?: number = 10;
}
