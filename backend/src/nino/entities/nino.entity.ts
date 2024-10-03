import { Municipio } from 'src/municipio/entities/municipio.entity';
import { NinoVacuna } from 'src/nino-vacuna/entities/nino-vacuna.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Check,
  Unique,
} from 'typeorm';

@Entity()
@Check(`"genero" IN ('Masculino', 'Femenino')`)
@Unique(['tarjetaIdentidad'])
export class Nino {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column()
  genero: 'Masculino' | 'Femenino';

  @Column({ default: false })
  estaVacunado: boolean;

  @Column()
  tarjetaIdentidad: string;

  @ManyToOne(() => Municipio, (municipio) => municipio.ninos, {
    onDelete: 'RESTRICT',
  })
  municipio: Municipio;

  @OneToMany(() => NinoVacuna, (ninoVacuna) => ninoVacuna.nino)
  ninoVacunas: NinoVacuna[];
}
