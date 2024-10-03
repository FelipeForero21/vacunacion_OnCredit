import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Nino } from 'src/nino/entities/nino.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, JoinColumn } from 'typeorm';

@Entity()
@Unique(['nombre', 'departamento'])
export class Municipio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Departamento, (departamento) => departamento.municipios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'departamentoId' })
  departamento: Departamento;

  @OneToMany(() => Nino, (nino) => nino.municipio)
  ninos: Nino[];
}
