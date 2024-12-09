import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City } from './entities/city.entity';
import { DepartmentService } from 'src/departments/departments.service';
import { CreateCityDto, UpdateCityDto } from './dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    private readonly departmentService: DepartmentService,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const { nombre, departamentoId } = createCityDto;
    const departamento = await this.departmentService.findOne(departamentoId);

    const existing = await this.cityRepository.findOne({
      where: { nombre },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt) 
      throw new ConflictException(`Ya existe una ciudad con el nombre '${nombre}'`);
    

    if (existing && existing.deletedAt) {
      await this.cityRepository.restore(existing.id);
      return this.cityRepository.findOne({ where: { id: existing.id } });
    }

    const ciudad = this.cityRepository.create({ nombre, departamento });
    return await this.cityRepository.save(ciudad);
  }

  findAll(): Promise<City[]> {
    return this.cityRepository.find({ relations: ['departamento'] });
  }

  async findOne(id: string): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['departamento'],
    });
    if (!city) throw new NotFoundException(`No se encontró una ciudad con el ID ${id}`);
    return city;
  }

  async update(id: string, updateCityDto: UpdateCityDto): Promise<City> {
    const city = await this.findOne(id);

    if (updateCityDto.nombre) {
      const existing = await this.cityRepository.findOne({
        where: { nombre: updateCityDto.nombre },
        withDeleted: false,
      });

      if (existing && existing.id !== id) {
        throw new ConflictException(`Ya existe una ciudad con el nombre '${updateCityDto.nombre}'`);
      }
    }

    return this.cityRepository.save({ ...city, ...updateCityDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.cityRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró una ciudad con el ID ${id}`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.cityRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró una ciudad con el ID ${id}`);
  }

  async findByDepartment(departmentId: string): Promise<City[]> {
    return this.cityRepository.find({ where: { departamento: { id: departmentId } }, relations: ['departamento'] });
  }
}
