import { NinoVacuna } from 'src/nino-vacuna/entities/nino-vacuna.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Vacuna {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  edadMaxima: number;

  @OneToMany(() => NinoVacuna, (ninoVacuna) => ninoVacuna.vacuna)
  ninoVacunas: NinoVacuna[];
}
