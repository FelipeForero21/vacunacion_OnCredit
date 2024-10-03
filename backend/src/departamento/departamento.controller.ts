import { Controller, Get, Param } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { Departamento } from './entities/departamento.entity';

@Controller('departamentos')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Get()
  async findAll(): Promise<Departamento[]> {
    return this.departamentoService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Departamento> {
    return this.departamentoService.findById(id);
  }
}
