import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { InterestTopic } from './entities/interest-topic.entity';
import { CreateInterestTopicDto, UpdateInterestTopicDto } from './dto';

@Injectable()
export class InterestTopicService {
  constructor(
    @InjectRepository(InterestTopic)
    private readonly interesTopicRepository: Repository<InterestTopic>,
  ) {}

  async create(createInterestTopicDto: CreateInterestTopicDto): Promise<InterestTopic> {
    const { nombre } = createInterestTopicDto;
    const existing = await this.interesTopicRepository.findOne({
      where: { nombre },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt)
      throw new ConflictException(`Ya existe un tema de interés con el nombre '${nombre}'`);

    if (existing && existing.deletedAt) {
      await this.interesTopicRepository.restore(existing.id);
      return this.interesTopicRepository.findOne({ where: { id: existing.id } });
    }

    const interesTopic = this.interesTopicRepository.create({ nombre });
    return this.interesTopicRepository.save(interesTopic);
  }

  findAll(): Promise<InterestTopic[]> {
    return this.interesTopicRepository.find();
  }

  async findOne(id: string): Promise<InterestTopic> {
    const interestTopic = await this.interesTopicRepository.findOne({ where: { id } });
    if (!interestTopic) throw new NotFoundException(`No se encontró un tema de interés con el ID ${id}`);
    return interestTopic;
  }

  async findByIds(ids: string[]): Promise<InterestTopic[]> {
    return this.interesTopicRepository.findBy({ id: In(ids) });
  }

  async update(id: string, updateInterestTopicDto: UpdateInterestTopicDto): Promise<InterestTopic> {
    const interesTopic = await this.findOne(id);

    if (updateInterestTopicDto.nombre) {
      const existing = await this.interesTopicRepository.findOne({
        where: { nombre: updateInterestTopicDto.nombre },
        withDeleted: false,
      });

      if (existing && existing.id !== id) {
        throw new ConflictException(`Ya existe un tema de interés con el nombre '${updateInterestTopicDto.nombre}'`);
      }
    }

    return this.interesTopicRepository.save({ ...interesTopic, ...updateInterestTopicDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.interesTopicRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un tema de interés con el ID ${id}`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.interesTopicRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un tema de interés con el ID ${id}`);
  }

}
