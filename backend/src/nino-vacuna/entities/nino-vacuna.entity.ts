
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Nino } from 'src/nino/entities/nino.entity';
import { Vacuna } from 'src/vacuna/entities/vacuna.entity';

@Entity()
export class NinoVacuna {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Nino, (nino) => nino.ninoVacunas, { eager: true, onDelete: 'CASCADE' })
  nino: Nino;

  @ManyToOne(() => Vacuna, (vacuna) => vacuna.ninoVacunas, { eager: true, onDelete: 'CASCADE' })
  vacuna: Vacuna;

  @Column({ type: 'date' })
  fechaAplicacion: Date;
}
