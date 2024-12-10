import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('grupo_etnico')
export class EthnicGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  nombre: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date;
}
