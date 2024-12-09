import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SisbenScore } from './entities/sisben-score.entity';
import { CreateSisbenScoreDto, UpdateSisbenScoreDto } from './dto';

@Injectable()
export class SisbenScoreService {
  constructor(
    @InjectRepository(SisbenScore)
    private readonly sisbenScoreRepository: Repository<SisbenScore>,
  ) {}

  async create(createSisbenScoreDto: CreateSisbenScoreDto): Promise<SisbenScore> {
    const { puntaje } = createSisbenScoreDto;

    const existing = await this.sisbenScoreRepository.findOne({
      where: { puntaje },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt)
      throw new ConflictException(`El puntaje de sisben '${puntaje}' ya existe.`);
    
    if (existing && existing.deletedAt) {
      await this.sisbenScoreRepository.restore(existing.id);
      return this.sisbenScoreRepository.save(existing);
    }

    const sisbenScore = this.sisbenScoreRepository.create({ puntaje });
    return this.sisbenScoreRepository.save(sisbenScore);
  }

  findAll(): Promise<SisbenScore[]> {
    return this.sisbenScoreRepository.find();
  }

  async findOne(id: string): Promise<SisbenScore> {
    const sisbenScore = await this.sisbenScoreRepository.findOne({ where: { id } });
    if (!sisbenScore) throw new NotFoundException(`No se encontró el puntaje de sisben con el ID ${id}`);
    return sisbenScore;
  }

  async update(id: string, updateSisbenScoreDto: UpdateSisbenScoreDto): Promise<SisbenScore> {
    const sisbenScore = await this.findOne(id);

    if (updateSisbenScoreDto.puntaje) {
      const existing = await this.sisbenScoreRepository.findOne({
        where: { puntaje: updateSisbenScoreDto.puntaje },
        withDeleted: true,
      });

      if (existing && existing.id !== id) {
        throw new ConflictException(`Ya existe el puntaje de interés '${updateSisbenScoreDto.puntaje}'`);
      }
    }

    return this.sisbenScoreRepository.save({ ...sisbenScore, ...updateSisbenScoreDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.sisbenScoreRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró el puntaje de sisben con el ID ${id}`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.sisbenScoreRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró el puntaje de sisben con el ID ${id}`);
  }
}
