import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { MunicipioService } from '../municipio/municipio.service';
import { CreateNinoDto } from './dto/create-nino.dto';
import { Nino } from './entities/nino.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class NinoService {
  constructor(
    @InjectRepository(Nino)
    private readonly ninoRepository: Repository<Nino>,
    private readonly municipioService: MunicipioService,
  ) {}

  async create(createNinoDto: CreateNinoDto): Promise<Nino> {
    const { tarjetaIdentidad, ...rest } = createNinoDto;

    const existingNino = await this.ninoRepository.findOne({
      where: { tarjetaIdentidad },
    });
    if (existingNino) {
      throw new BadRequestException('La tarjeta de identidad ya está en uso');
    }

    const municipio = await this.municipioService.findById(
      createNinoDto.municipioId,
    );
    if (!municipio) {
      throw new BadRequestException('Municipio no encontrado');
    }

    const nino = this.ninoRepository.create({
      ...rest,
      tarjetaIdentidad,
      municipio,
    });

    return this.ninoRepository.save(nino);
  }

  async findAll(
    paginationDto: PaginationDto,
    municipioId?: number,
    estadoVacunacion?: string,
  ): Promise<any> {
    const { page = 1, limit = 10 } = paginationDto;

    let where: any = {};

    if (municipioId) {
      where.municipio = { id: municipioId };
    }

    if (estadoVacunacion) {
      if (estadoVacunacion === 'vacunados') {
        where.estaVacunado = true;
      } else if (estadoVacunacion === 'no_vacunados') {
        where.estaVacunado = false;
      }
    }

    const [data, totalItems] = await this.ninoRepository.findAndCount({
      where,
      relations: ['municipio', 'municipio.departamento'],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      meta: {
        totalItems,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findByMunicipio(municipioId: number): Promise<Nino[]> {
    return this.ninoRepository.find({
      where: { municipio: { id: municipioId } },
      relations: ['municipio'],
    });
  }

  async findById(id: number): Promise<Nino> {
    const nino = await this.ninoRepository.findOne({
      where: { id },
      relations: ['municipio'],
    });
    if (!nino) {
      throw new NotFoundException('Niño no encontrado');
    }
    return nino;
  }

  async findByTarjetaIdentidad(tarjetaId: string): Promise<Nino[]> {
    if (!tarjetaId || tarjetaId.trim() === '') {
      throw new BadRequestException(
        'El parámetro tarjetaId es requerido y no puede estar vacío',
      );
    }

    return this.ninoRepository.find({
      where: { tarjetaIdentidad: ILike(`%${tarjetaId}%`) },
      relations: ['municipio', 'municipio.departamento'],
    });
  }

  async update(nino: Nino): Promise<Nino> {
    return this.ninoRepository.save(nino);
  }

  async updateMunicipio(ninoId: number, municipioId: number): Promise<Nino> {
    const nino = await this.findById(ninoId);
    if (!nino) {
      throw new BadRequestException('Niño no encontrado');
    }

    const municipio = await this.municipioService.findById(municipioId);
    if (!municipio) {
      throw new BadRequestException('Municipio no encontrado');
    }

    nino.municipio = municipio;
    return this.ninoRepository.save(nino);
  }

  async resumenPorMunicipio(): Promise<any> {
    return this.ninoRepository
      .createQueryBuilder('nino')
      .leftJoin('nino.municipio', 'municipio')
      .select('municipio.nombre', 'municipio')
      .addSelect('COUNT(nino.id)', 'totalNinos')
      .addSelect(
        'SUM(CASE WHEN nino.estaVacunado THEN 1 ELSE 0 END)',
        'ninosVacunados',
      )
      .groupBy('municipio.nombre')
      .getRawMany();
  }

  async promedioEdadPorMunicipio(municipioId: number): Promise<any> {
    const result = await this.ninoRepository
      .createQueryBuilder('nino')
      .where('nino.municipioId = :municipioId', { municipioId })
      .select(
        'AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, nino.fechaNacimiento)))',
        'promedioEdad',
      )
      .getRawOne();

    return {
      municipioId,
      promedioEdad: parseFloat(result.promedioEdad).toFixed(2),
    };
  }

  async actualizarEstadoVacunacion(
    id: number,
    estaVacunado: boolean,
  ): Promise<Nino> {
    const nino = await this.ninoRepository.findOne({ where: { id } });

    if (!nino) {
      throw new NotFoundException(`Niño con id ${id} no encontrado`);
    }

    nino.estaVacunado = estaVacunado;
    return this.ninoRepository.save(nino);
  }

  async obtenerNinosPorMunicipio(municipioId: number): Promise<Nino[]> {
    const municipio = await this.municipioService.findOne(municipioId);
    if (!municipio) {
      throw new Error('Municipio no encontrado');
    }
    return municipio.ninos || [];
  }
}
