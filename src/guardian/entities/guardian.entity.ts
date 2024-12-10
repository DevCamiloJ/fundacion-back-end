import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('acudiente')
export class Guardian {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  nombre: string;

  @Column()
  edad: number;

  @Column({ name: 'tipo_documento' })
  tipoDocumento: string;

  @Column({ name: 'numero_documento', unique: true })
  numeroDocumento: string;

  @Column()
  escolaridad: string;

  @Column()
  trabaja: boolean;

  @Column({ name: 'lugar_trabajo', nullable: true })
  lugarTrabajo?: string;

  @Column({ name: 'emprende_o_arte' })
  emprendeOArte: boolean;

  @Column({ name: 'cual_arte', nullable: true })
  cualArte?: string;

  @Column({ name: 'numero_hijos' })
  numeroHijos: number;

  @Column({ name: 'numero_celular' })
  numeroCelular: string;

  @Column({ type: 'boolean', default: false })
  victimaVBG: boolean;

  @Column({ type: 'text', nullable: true })
  caso: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date;
}
