import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoService } from '../departamento/departamento.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private municipioRepository: Repository<Municipio>,
    private departamentoService: DepartamentoService,
  ) {}

  async create(createMunicipioDto: CreateMunicipioDto): Promise<Municipio> {
    const departamento = await this.departamentoService.findById(createMunicipioDto.departamentoId);
    if (!departamento) {
      throw new BadRequestException('Departamento no encontrado');
    }

    const municipio = this.municipioRepository.create({
      nombre: createMunicipioDto.nombre,
      departamento,
    });

    return this.municipioRepository.save(municipio);
  }

  async findAll(): Promise<Municipio[]> {
    return this.municipioRepository.find({ relations: ['departamento'] });
  }

  async findByDepartamento(departamentoId: number): Promise<Municipio[]> {
    return this.municipioRepository.find({
      where: { departamento: { id: departamentoId } },
      relations: ['departamento'],
    });
  }

  async findById(id: number): Promise<Municipio> {
    return this.municipioRepository.findOne({ where: { id }, relations: ['departamento'] });
  }

  async findOne(municipioId: number): Promise<Municipio> {
    return this.municipioRepository.findOne({
      where: { id: municipioId },
      relations: ['ninos'], 
    });
  }
}
