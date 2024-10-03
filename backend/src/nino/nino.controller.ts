import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { NinoService } from './nino.service';
import { CreateNinoDto } from './dto/create-nino.dto';
import { Nino } from './entities/nino.entity';
import { PaginationDto } from './dto/pagination.dto';

@Controller('ninos')
export class NinoController {
  constructor(private readonly ninoService: NinoService) {}

  @Post()
  async create(@Body() createNinoDto: CreateNinoDto): Promise<Nino> {
    return this.ninoService.create(createNinoDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<any> {
    return this.ninoService.findAll(paginationDto);
  }
  @Get('filtrados')
  async getFilteredNinos(
    @Query() paginationDto: PaginationDto,
    @Query('municipioId') municipioId?: number,
    @Query('estadoVacunacion') estadoVacunacion?: string,
  ): Promise<any> {
    const validEstados = ['todos', 'vacunados', 'no_vacunados'];

    return this.ninoService.findAll(paginationDto, municipioId, estadoVacunacion);
  }



  @Get('/municipio/:id')
  async findByMunicipio(@Param('id') id: number): Promise<Nino[]> {
    return this.ninoService.findByMunicipio(id);
  }

  @Put('/:id/municipio')
  async updateMunicipio(
    @Param('id') ninoId: number,
    @Body() data: { municipioId: number },
  ): Promise<Nino> {
    return this.ninoService.updateMunicipio(ninoId, data.municipioId);
  }

  @Get('/resumen/municipios')
  async resumenPorMunicipio(): Promise<any> {
    return this.ninoService.resumenPorMunicipio();
  }

  @Get('/municipio/:id/promedio-edad')
  async promedioEdadPorMunicipio(
    @Param('id') municipioId: number,
  ): Promise<any> {
    return this.ninoService.promedioEdadPorMunicipio(municipioId);
  }

  @Get('/tarjeta-identidad/:tarjetaId')
  async findByTarjetaIdentidad(
    @Param('tarjetaId') tarjetaId: string,
  ): Promise<Nino[]> {
    const resultados = await this.ninoService.findByTarjetaIdentidad(tarjetaId);
    if (!resultados || resultados.length === 0) {
      throw new NotFoundException(
        'No se encontraron niños con la tarjeta de identidad proporcionada',
      );
    }
    return resultados;
  }

  @Put('/:id/estado-vacunacion')
  async actualizarEstadoVacunacion(
    @Param('id') id: number,
    @Body() updateVacunacionDto: { estaVacunado: boolean },
  ): Promise<Nino> {
    return this.ninoService.actualizarEstadoVacunacion(
      id,
      updateVacunacionDto.estaVacunado,
    );
  }

  @Get('municipio/:municipioId')
  async obtenerNinosPorMunicipio(@Param('municipioId') municipioId: number) {
    return this.ninoService.obtenerNinosPorMunicipio(municipioId);
  }
}
