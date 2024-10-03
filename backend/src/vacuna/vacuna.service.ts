import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { Vacuna } from './entities/vacuna.entity';

@Injectable()
export class VacunaService {
  constructor(
    @InjectRepository(Vacuna)
    private vacunaRepository: Repository<Vacuna>,
  ) {}

  async create(createVacunaDto: CreateVacunaDto): Promise<Vacuna> {
    const vacuna = this.vacunaRepository.create(createVacunaDto);
    return this.vacunaRepository.save(vacuna);
  }

  async findAll(): Promise<Vacuna[]> {
    return this.vacunaRepository.find();
  }

  async findById(id: number): Promise<Vacuna> {
    return this.vacunaRepository.findOne({ where: { id } });
  }

async countAllVacunas(): Promise<number> {
  return this.vacunaRepository.count();
}

}
