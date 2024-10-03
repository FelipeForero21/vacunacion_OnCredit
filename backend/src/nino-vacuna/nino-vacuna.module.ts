import { Module } from '@nestjs/common';
import { NinoVacunaService } from './nino-vacuna.service';
import { NinoVacunaController } from './nino-vacuna.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NinoModule } from '../nino/nino.module';
import { VacunaModule } from '../vacuna/vacuna.module';
import { NinoVacuna } from './entities/nino-vacuna.entity';
import { Nino } from 'src/nino/entities/nino.entity';
import { Vacuna } from 'src/vacuna/entities/vacuna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NinoVacuna, Nino, Vacuna]), NinoModule, VacunaModule],
  controllers: [NinoVacunaController],
  providers: [NinoVacunaService],
  exports: [NinoVacunaService],
})
export class NinoVacunaModule {}
