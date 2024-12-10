import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('nucleo_familiar')
export class FamilyCore {
  @PrimaryGeneratedColumn('uuid')
  id: string;    

  @Column({ unique: true, length: 200 })
  nombre: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date;
}
