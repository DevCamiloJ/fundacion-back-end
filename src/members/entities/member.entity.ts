import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('miembro')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  nombres: string;
  
  @Column()
  apellidos: string;
  
  @Column()
  tipoDocumento: string;
  
  @Column()
  numeroDocumento: string;
  
  @Column({ type: 'date' })
  fechaNacimiento: Date;
  
  @Column()
  edad: number;
  
  @Column()
  ciudadNacimiento: string;
  
  @Column()
  paisNacimiento: string;
  
  @Column({ default: true })
  estudia: boolean;
  
  @Column({ nullable: true })
  grado: string;
  
  @Column({ nullable: true })
  institucionEducativa: string;
  
  @Column({ nullable: true })
  eps: string;
  
  @Column({ default: false })
  tieneSisbem: boolean;
  
  @Column({ nullable: true })
  grupoPoblacional: string;
  
  @Column({ nullable: true })
  grupoEtnico: string;
  
  @Column({ default: false })
  discapacidad: boolean;
  
  @Column({ nullable: true })
  condicionMedica: string;
  
  @Column({ default: true })
  estado: boolean;
}
