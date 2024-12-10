import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EthnicGroup } from './entities/ethnic-group.entity';
import { CreateEthnicGroupDto, UpdateEthnicGroupDto } from './dto';

@Injectable()
export class EthnicGroupService {
  constructor(
    @InjectRepository(EthnicGroup)
    private readonly ethnicGroupRepository: Repository<EthnicGroup>,
  ) {}

  async create(createEthnicGroupDto: CreateEthnicGroupDto): Promise<EthnicGroup> {
    const { nombre } = createEthnicGroupDto;

    const existing = await this.ethnicGroupRepository.findOne({
      where: { nombre },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt) 
      throw new ConflictException(`Ya existe un grupo étnico con el nombre '${nombre}'.`);

    if (existing && existing.deletedAt) {
      await this.ethnicGroupRepository.restore(existing.id);
      return this.ethnicGroupRepository.findOne({ where: { id: existing.id } });
    }

    const ethnicGroup = this.ethnicGroupRepository.create({ nombre });
    return this.ethnicGroupRepository.save(ethnicGroup);
  }

  findAll(): Promise<EthnicGroup[]> {
    return this.ethnicGroupRepository.find();
  }

  async findOne(id: string): Promise<EthnicGroup> {
    const ethnicGroup = await this.ethnicGroupRepository.findOne({ where: { id } });
    if (!ethnicGroup) throw new NotFoundException(`No se encontró ningún grupo étnico con el ID ${id}.`);
    return ethnicGroup;
  }

  async update(id: string, updateEthnicGroupDto: UpdateEthnicGroupDto): Promise<EthnicGroup> {
    const ethnicGroup = await this.findOne(id);

    if (updateEthnicGroupDto.nombre) {
      const existing = await this.ethnicGroupRepository.findOne({
        where: { nombre: updateEthnicGroupDto.nombre },
      });

      if (existing && existing.id !== id)
        throw new ConflictException(`Ya existe un grupo étnico con el nombre '${updateEthnicGroupDto.nombre}'.`);
    }

    return this.ethnicGroupRepository.save({ ...ethnicGroup, ...updateEthnicGroupDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.ethnicGroupRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró ningún grupo étnico con el ID ${id}.`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.ethnicGroupRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró ningún grupo étnico con el ID ${id}.`);
  }
}
