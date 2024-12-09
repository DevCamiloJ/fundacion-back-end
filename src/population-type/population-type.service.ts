import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PopulationType } from './entities/population-type.entity';
import { CreatePopulationTypeDto, UpdatePopulationTypeDto } from './dto';

@Injectable()
export class PopulationTypeService {
  constructor(
    @InjectRepository(PopulationType)
    private readonly populationTypeRepository: Repository<PopulationType>,
  ) {}

  async create(createPopulationTypeDto: CreatePopulationTypeDto): Promise<PopulationType> {
    const { nombre } = createPopulationTypeDto;

    const existing = await this.populationTypeRepository.findOne({
      where: { nombre },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt) 
      throw new ConflictException(`Ya existe un tipo poblacional con el nombre '${nombre}'`);
    
    if (existing && existing.deletedAt) {
      await this.populationTypeRepository.restore(existing.id);
      return this.populationTypeRepository.findOne({ where: { id: existing.id } });
    }

    const tipoPoblacional = this.populationTypeRepository.create({ nombre });
    return this.populationTypeRepository.save(tipoPoblacional);
  }

  findAll(): Promise<PopulationType[]> {
    return this.populationTypeRepository.find();
  }

  async findOne(id: string): Promise<PopulationType> {
    const tipoPoblacional = await this.populationTypeRepository.findOne({ where: { id } });
    if (!tipoPoblacional) throw new NotFoundException(`No se encontró un tipo poblacional con el ID ${id}`);
    return tipoPoblacional;
  }

  async update(id: string, updatePopulationTypeDto: UpdatePopulationTypeDto,): Promise<PopulationType> {
    const tipoPoblacional = await this.findOne(id);

    if (updatePopulationTypeDto.nombre) {
      const existing = await this.populationTypeRepository.findOne({
        where: { nombre: updatePopulationTypeDto.nombre },
      });

      if (existing && existing.id !== id)
        throw new ConflictException(`Ya existe un tipo poblacional con el nombre '${updatePopulationTypeDto.nombre}'`);
    }

    return this.populationTypeRepository.save({ ...tipoPoblacional, ...updatePopulationTypeDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.populationTypeRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un tipo poblacional con el ID ${id}`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.populationTypeRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un tipo poblacional con el ID ${id}`);
  }
}
