import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateDisabilityDto, UpdateDisabilityDto } from './dto';
import { Disability } from './entities/disability.entity';

@Injectable()
export class DisabilityService {
  constructor(
    @InjectRepository(Disability)
    private readonly disabilityRepository: Repository<Disability>
  ) {}

  async create(createDisabilityDto: CreateDisabilityDto): Promise<Disability> {
    const { nombre } = createDisabilityDto;
    
    const existing = await this.disabilityRepository.findOne({
      where: { nombre },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt) 
      throw new ConflictException(`Ya existe un discapacidad con el nombre '${nombre}'`);
    
    if (existing && existing.deletedAt) {
      await this.disabilityRepository.restore(existing.id);
      return this.disabilityRepository.findOne({ where: { id: existing.id } });
    }

    const disability = this.disabilityRepository.create({ nombre });
    return await this.disabilityRepository.save(disability);
  }

  findAll(): Promise<Disability[]> {
    return this.disabilityRepository.find();
  }

  async findOne(id: string) {
    const disability = await this.disabilityRepository.findOne({ where: { id } });
    if (!disability) throw new NotFoundException(`No se encontró una discapacidad con el ID ${id}`);
    return disability;
  }

  async findByIds(ids: string[]) {
    return this.disabilityRepository.findBy({ id: In(ids) });
  }

  async update(id: string, updateDisabilityDto: UpdateDisabilityDto) {
    const disability = await this.findOne(id);

    if (updateDisabilityDto.nombre) {
      const existing = await this.disabilityRepository.findOne({
        where: { nombre: updateDisabilityDto.nombre },
        withDeleted: false,
      });

      if (existing && existing.id !== id) 
        throw new ConflictException(`Ya existe una discapacidad con el nombre '${updateDisabilityDto.nombre}'`);
    }

    return this.disabilityRepository.save({ ...disability, ...updateDisabilityDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.disabilityRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró una discapacidad con el ID ${id}`);
  } 

  async restore(id: string): Promise<void> {
    const result = await this.disabilityRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un discapacidad con el ID ${id}`);
  }
}
