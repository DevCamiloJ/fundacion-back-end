import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Eps } from './entities/eps.entity';
import { CreateEpsDto, UpdateEpsDto } from './dto';

@Injectable()
export class EpsService {
  constructor(
    @InjectRepository(Eps)
    private readonly epsRepository: Repository<Eps>,
  ) {}

  async create(createEpsDto: CreateEpsDto): Promise<Eps> {
    const { nombre } = createEpsDto;
    const existing = await this.epsRepository.findOne({
      where: { nombre },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt) 
      throw new ConflictException(`Ya existe una EPS con el nombre '${nombre}'`);

    if (existing && existing.deletedAt) {
      await this.epsRepository.restore(existing.id);
      return this.epsRepository.findOne({ where: { id: existing.id } });
    }

    const eps = this.epsRepository.create({ nombre });
    return this.epsRepository.save(eps);
  }

  findAll(): Promise<Eps[]> {
    return this.epsRepository.find();
  }

  async findOne(id: string): Promise<Eps> {
    const eps = await this.epsRepository.findOne({ where: { id } });
    if (!eps) throw new NotFoundException(`No se encontró una EPS con el ID ${id}`);
    return eps;
  }

  async update(id: string, updateEpsDto: UpdateEpsDto): Promise<Eps> {
    const eps = await this.findOne(id);

    if (updateEpsDto.nombre) {
      const existing = await this.epsRepository.findOne({
        where: { nombre: updateEpsDto.nombre },
        withDeleted: false,
      });

      if (existing && existing.id !== id)
        throw new ConflictException(`Ya existe una EPS con el nombre '${updateEpsDto.nombre}'`);
    }
    return this.epsRepository.save({ ...eps, ...updateEpsDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.epsRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró una EPS con el ID ${id}`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.epsRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró una EPS con el ID ${id}`);
  }
}
