import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}

  async findAll(): Promise<Departamento[]> {
    return this.departamentoRepository.find({ relations: ['municipios'] });
  }

  async findById(id: number): Promise<Departamento> {
    return this.departamentoRepository.findOne({ where: { id } });
  }
}
