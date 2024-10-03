
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { NinoService } from '../nino/nino.service';
import { VacunaService } from '../vacuna/vacuna.service';
import { AplicarVacunaDto } from './dto/aplicar-vacuna.dto';
import { NinoVacuna } from './entities/nino-vacuna.entity';
import { Nino } from '../nino/entities/nino.entity';
import { Vacuna } from 'src/vacuna/entities/vacuna.entity';

@Injectable()
export class NinoVacunaService {
  constructor(
    @InjectRepository(NinoVacuna)
    private readonly ninoVacunaRepository: Repository<NinoVacuna>,
    private readonly ninoService: NinoService,
    private readonly vacunaService: VacunaService,
    @InjectRepository(Nino)
    private readonly ninoRepository: Repository<Nino>,
  ) {}
  async aplicarVacuna(aplicarVacunaDto: AplicarVacunaDto): Promise<NinoVacuna> {
    const { ninoId, vacunaId, fechaAplicacion } = aplicarVacunaDto;
  
    const nino = await this.ninoService.findById(ninoId);
    if (!nino) {
      throw new BadRequestException('Niño no encontrado');
    }
  
    const vacuna = await this.vacunaService.findById(vacunaId);
    if (!vacuna) {
      throw new BadRequestException('Vacuna no encontrada');
    }
  
    const edadNino = this.calcularEdad(nino.fechaNacimiento);
    if (edadNino > vacuna.edadMaxima) {
      throw new BadRequestException('El niño supera la edad máxima para esta vacuna');
    }
  
    const vacunaAplicada = await this.ninoVacunaRepository.findOne({
      where: { nino: { id: ninoId }, vacuna: { id: vacunaId } },
    });
    if (vacunaAplicada) {
      throw new BadRequestException('La vacuna ya ha sido aplicada a este niño');
    }
  
    const ninoVacuna = this.ninoVacunaRepository.create({
      nino,
      vacuna,
      fechaAplicacion,
    });
  
    await this.ninoVacunaRepository.save(ninoVacuna);
  
    await this.actualizarEstadoVacunacion(nino);
  
    return ninoVacuna;
  }
  
  private async actualizarEstadoVacunacion(nino: Nino): Promise<void> {
    const totalVacunas = await this.vacunaService.countAllVacunas();
  
    const vacunasRecibidas = await this.ninoVacunaRepository.count({
      where: { nino: { id: nino.id } },
    });
  
    if (vacunasRecibidas >= totalVacunas) {
      nino.estaVacunado = true;
    } else {
      nino.estaVacunado = false;
    }
  
    await this.ninoRepository.save(nino);
  }
  
  private calcularEdad(fechaNacimiento: Date | string): number {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
      edad--;
    }
    return edad;
  }

  async contarNiñosVacunados(): Promise<number> {
    return this.ninoRepository.count({
      where: { estaVacunado: true },
    });
  }

  async contarNiñosNoVacunados(): Promise<number> {
    return this.ninoRepository.count({
      where: { estaVacunado: false },
    });
  }
  async obtenerVacunasPendientes(ninoId: number): Promise<Vacuna[]> {
    const nino = await this.ninoRepository.findOne({ where: { id: ninoId } });
    if (!nino) {
      throw new NotFoundException('Niño no encontrado');
    }

    const todasVacunas = await this.vacunaService.findAll();

    const vacunasAplicadas = await this.ninoVacunaRepository.find({
      where: { nino: { id: ninoId } },
      relations: ['vacuna'],
    });
    const idsVacunasAplicadas = vacunasAplicadas.map(v => v.vacuna.id);

    const vacunasPendientes = todasVacunas.filter(
      vacuna => !idsVacunasAplicadas.includes(vacuna.id),
    );

    return vacunasPendientes;
  }

}
