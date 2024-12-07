import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CountriesService } from 'src/countries/countries.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    private readonly countryService: CountriesService,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const { nombre, paisId } = createDepartmentDto;
    const country = await this.countryService.findOne(paisId);
    
    const existing = await this.departmentRepository.findOne({
      where: { nombre },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt) 
      throw new ConflictException(`Ya existe un departamento con el nombre '${nombre}'`);
    
    if (existing && existing.deletedAt) {
      await this.departmentRepository.restore(existing.id);
      return this.departmentRepository.findOne({ where: { id: existing.id } });
    }

    const department = this.departmentRepository.create({ nombre, pais: country });
    return await this.departmentRepository.save(department);
  }

  findAll(): Promise<Department[]> {
    return this.departmentRepository.find({ relations: ['pais'] });
  }

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['country'],
    });
    if (!department) throw new NotFoundException(`No se encontró un departamento con el ID ${id}`);
    return department;
  }

  async findByCountry(paisId: string): Promise<Department[]> {
    const country = await this.countryService.findOne(paisId);
    return this.departmentRepository.find({ where: { pais: country }, relations: ['pais'] });
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    const department = await this.findOne(id);

    if (updateDepartmentDto.nombre) {
      const existing = await this.departmentRepository.findOne({
        where: { nombre: updateDepartmentDto.nombre },
        withDeleted: false,
      });

      if (existing && existing.id !== id) 
        throw new ConflictException(`Ya existe un departamento con el nombre '${updateDepartmentDto.nombre}'`);
    }

    return this.departmentRepository.save({ ...department, ...updateDepartmentDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.departmentRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un departamento con el ID ${id}`);
  } 

  async restore(id: string): Promise<void> {
    const result = await this.departmentRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un departamento con el ID ${id}`);
  }
}
