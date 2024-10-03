import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { NinoVacunaService } from './nino-vacuna.service';
import { AplicarVacunaDto } from './dto/aplicar-vacuna.dto';
import { NinoVacuna } from './entities/nino-vacuna.entity';

@Controller('nino-vacuna')
export class NinoVacunaController {
  constructor(private readonly ninoVacunaService: NinoVacunaService) {}

  @Post()
  async aplicarVacuna(@Body() aplicarVacunaDto: AplicarVacunaDto): Promise<NinoVacuna> {
    return this.ninoVacunaService.aplicarVacuna(aplicarVacunaDto);
  }

  @Get('pendientes/:ninoId')
  async getVacunasPendientes(@Param('ninoId') ninoId: number) {
    return this.ninoVacunaService.obtenerVacunasPendientes(ninoId);
  }
    @Get('vacunados/count')
    async contarNiñosVacunados(): Promise<number> {
      return this.ninoVacunaService.contarNiñosVacunados();
    }
  
    @Get('no-vacunados/count')
    async contarNiñosNoVacunados(): Promise<number> {
      return this.ninoVacunaService.contarNiñosNoVacunados();
    }

    
}
