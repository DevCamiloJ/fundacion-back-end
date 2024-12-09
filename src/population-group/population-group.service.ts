import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PopulationGroup } from './entities/population-group.entity';
import { CreatePopulationGroupDto, UpdatePopulationGroupDto } from './dto';

@Injectable()
export class PopulationGroupService {
  constructor(
    @InjectRepository(PopulationGroup)
    private readonly populationGroupRepository: Repository<PopulationGroup>,
  ) {}

  async create(createPopulationGroupDto: CreatePopulationGroupDto): Promise<PopulationGroup> {
    const { nombre } = createPopulationGroupDto;

    const existing = await this.populationGroupRepository.findOne({
      where: { nombre },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt)
      throw new ConflictException(`Ya existe un grupo poblacional con el nombre '${nombre}'`);

    if (existing && existing.deletedAt) {
      await this.populationGroupRepository.restore(existing.id);
      return this.populationGroupRepository.findOne({ where: { id: existing.id } });
    }

    const grupoPoblacional = this.populationGroupRepository.create({ nombre });
    return this.populationGroupRepository.save(grupoPoblacional);
  }

  findAll(): Promise<PopulationGroup[]> {
    return this.populationGroupRepository.find();
  }

  async findOne(id: string): Promise<PopulationGroup> {
    const grupoPoblacional = await this.populationGroupRepository.findOne({
      where: { id },
    });
    if (!grupoPoblacional) throw new NotFoundException(`No se encontró un grupo poblacional con el ID ${id}`);
    return grupoPoblacional;
  }

  async update(id: string, updatePopulationGroupDto: UpdatePopulationGroupDto): Promise<PopulationGroup> {
    const grupoPoblacional = await this.findOne(id);

    if (updatePopulationGroupDto.nombre) {
      const existing = await this.populationGroupRepository.findOne({
        where: { nombre: updatePopulationGroupDto.nombre },
      });

      if (existing && existing.id !== id)
        throw new ConflictException(`Ya existe un grupo poblacional con el nombre '${updatePopulationGroupDto.nombre}'`);
    }

    return this.populationGroupRepository.save({ ...grupoPoblacional, ...updatePopulationGroupDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.populationGroupRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un grupo poblacional con el ID ${id}`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.populationGroupRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un grupo poblacional con el ID ${id}`);
  }
}
