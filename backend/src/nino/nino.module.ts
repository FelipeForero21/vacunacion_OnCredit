import { Module } from '@nestjs/common';
import { NinoService } from './nino.service';
import { NinoController } from './nino.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipioModule } from '../municipio/municipio.module';
import { Nino } from './entities/nino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nino]), MunicipioModule],
  controllers: [NinoController],
  providers: [NinoService],
  exports: [NinoService],
})
export class NinoModule {}
