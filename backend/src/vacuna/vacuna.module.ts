import { Module } from '@nestjs/common';
import { VacunaService } from './vacuna.service';
import { VacunaController } from './vacuna.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacuna } from './entities/vacuna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacuna])],
  controllers: [VacunaController],
  providers: [VacunaService],
  exports: [VacunaService],
})
export class VacunaModule {}
