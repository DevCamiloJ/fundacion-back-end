import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { City } from 'src/cities/entities/city.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Disability } from 'src/disability/entities/disability.entity';
import { EducationalInstitution } from 'src/educational-institutions/entities/educational-institution.entity';
import { Eps } from 'src/eps/entities/eps.entity';
import { EthnicGroup } from 'src/ethnic-group/entities/ethnic-group.entity';
import { InterestTopic } from 'src/interest-topic/entities/interest-topic.entity';
import { PopulationGroup } from 'src/population-group/entities/population-group.entity';
import { SisbenScore } from 'src/sisben-score/entities/sisben-score.entity';

@Entity('miembro')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'varchar', length: 255 })
  nombres: string;

  @Column({ type: 'varchar', length: 255 })
  apellidos: string;

  @Column({ type: 'varchar', length: 50 })
  tipoDocumento: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  numeroDocumento: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ type: 'varchar', nullable: true })
  imagenUrl: string;

  @ManyToOne(() => Country, { eager: true })
  paisNacimiento: string;

  @ManyToOne(() => Department, { eager: true })
  departamentoNacimiento: string;

  @ManyToOne(() => City, { eager: true })
  ciudadNacimiento: string;

  @Column({ type: 'float' })
  peso: number;

  @Column({ type: 'varchar', length: 10 })
  talla: string;

  @ManyToOne(() => EducationalInstitution, { nullable: true, eager: true })
  institucionEducativa: string;

  @Column({ type: 'varchar', nullable: true })
  grado: string;

  @Column({ type: 'date' })
  fechaIngresoFundacion: Date;

  @ManyToOne(() => Eps, { nullable: true, eager: true })
  eps: string;

  @ManyToOne(() => SisbenScore, { eager: true })
  puntajeSisben: string;

  @ManyToOne(() => PopulationGroup, { nullable: true, eager: true })
  grupoPoblacional: string;

  @ManyToOne(() => EthnicGroup, { nullable: true, eager: true })
  grupoEtnico: string;

  @Column({ type: 'varchar', nullable: true })
  numeroCasoVGB: string;

  @Column({ type: 'varchar', nullable: true })
  numeroCasoViolenciaFamiliar: string;

  @Column({ type: 'varchar', nullable: true })
  numeroCasoPsicologico: string;

  @ManyToMany(() => InterestTopic)
  @JoinTable()
  areasInteres: InterestTopic[];

  @ManyToMany(() => Disability)
  @JoinTable()
  discapacidades: Disability[];

  @Column({ type: 'varchar', nullable: true })
  discapacidadMedica: string;
  
  @Column({ default: true })
  estado: boolean;
}
