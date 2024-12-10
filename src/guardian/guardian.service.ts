import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Guardian } from './entities/guardian.entity';
import { CreateGuardianDto, UpdateGuardianDto } from './dto';

@Injectable()
export class GuardianService {
  constructor(
    @InjectRepository(Guardian)
    private readonly guardianRepository: Repository<Guardian>,
  ) {}

  async isDocumentNumberUnique(numeroDocumento: string): Promise<boolean> {
    const existing = await this.guardianRepository.findOne({
      where: { numeroDocumento },
      withDeleted: true,
    });
    return !(existing && !existing.deletedAt);
  }

  async create(createGuardianDto: CreateGuardianDto): Promise<Guardian> {
    const { numeroDocumento } = createGuardianDto;

    const existing = await this.guardianRepository.findOne({
      where: { numeroDocumento },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt) 
      throw new ConflictException(`Ya existe un acudiente con el número de documento '${numeroDocumento}'.`);

    if (existing && existing.deletedAt) {
      await this.guardianRepository.restore(existing.id);
      return this.guardianRepository.findOne({ where: { id: existing.id } });
    }

    const acudiente = this.guardianRepository.create(createGuardianDto);
    return this.guardianRepository.save(acudiente);
  }

  findAll(): Promise<Guardian[]> {
    return this.guardianRepository.find();
  }

  async findOne(id: string): Promise<Guardian> {
    const guardian = await this.guardianRepository.findOne({ where: { id } });
    if (!guardian) throw new NotFoundException(`No se encontró un acudiente con el ID ${id}.`);
    return guardian;
  }

  async update(id: string, updateGuardianDto: UpdateGuardianDto): Promise<Guardian> {
    const guardian = await this.findOne(id);

    if (updateGuardianDto.numeroDocumento) {
      const existing = await this.guardianRepository.findOne({
        where: { numeroDocumento: updateGuardianDto.numeroDocumento },
      });

      if (existing && existing.id !== id)
        throw new ConflictException(`Ya existe un acudiente con el número de documento '${updateGuardianDto.numeroDocumento}'.`);
    }

    return this.guardianRepository.save({ ...guardian, ...updateGuardianDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.guardianRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un acudiente con el ID ${id}.`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.guardianRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un acudiente con el ID ${id}.`);
  }
}
