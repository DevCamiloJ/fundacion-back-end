import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TipoVivienda } from '../enums/tipo-vivienda.enum';

@Entity('vivienda')
export class Housing {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column({ type: 'enum', enum: TipoVivienda })
  vivienda: TipoVivienda;

  @Column({ length: 200 })
  direccionVivienda: string;

  @Column({ type: 'int' })
  numeroHabitaciones: number;

  @Column({ length: 50 })
  tipoVivienda: string;

  @Column({ length: 100 })
  barrio: string;

  @Column({ type: 'int' })
  numeroPersonasConviven: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date;
}
