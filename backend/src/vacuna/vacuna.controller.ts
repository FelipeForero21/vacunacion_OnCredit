import { Controller, Get, Post, Body } from '@nestjs/common';
import { VacunaService } from './vacuna.service';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { Vacuna } from './entities/vacuna.entity';

@Controller('vacunas')
export class VacunaController {
  constructor(private readonly vacunaService: VacunaService) {}

  @Post()
  async create(@Body() createVacunaDto: CreateVacunaDto): Promise<Vacuna> {
    return this.vacunaService.create(createVacunaDto);
  }

  @Get()
  async findAll(): Promise<Vacuna[]> {
    return this.vacunaService.findAll();
  }
}
