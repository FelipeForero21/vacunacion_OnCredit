import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { Municipio } from './entities/municipio.entity';

@Controller('municipios')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Post()
  async create(@Body() createMunicipioDto: CreateMunicipioDto): Promise<Municipio> {
    return this.municipioService.create(createMunicipioDto);
  }

  @Get()
  async findAll(): Promise<Municipio[]> {
    return this.municipioService.findAll();
  }

  @Get('/departamento/:id')
  async findByDepartamento(@Param('id') id: number): Promise<Municipio[]> {
    return this.municipioService.findByDepartamento(id);
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Municipio> {
    return this.municipioService.findById(id);
  }
  
}
