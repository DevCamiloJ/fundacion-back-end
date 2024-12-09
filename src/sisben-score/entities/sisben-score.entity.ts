import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('puntaje_sisben')
export class SisbenScore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  puntaje: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
