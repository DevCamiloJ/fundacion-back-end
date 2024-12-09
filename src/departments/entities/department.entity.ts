import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Country } from 'src/countries/entities/country.entity';
import { City } from 'src/cities/entities/city.entity';

@Entity('departamento')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @ManyToOne(() => Country, (pais) => pais.departamentos, { nullable: false, onDelete: 'CASCADE' })
  pais: Country;

  @OneToMany(() => City, (ciudad) => ciudad.departamento)
  ciudades: City[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
