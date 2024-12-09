import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EducationalInstitution } from './entities/educational-institution.entity';
import { CreateEducationalInstitutionDto, UpdateEducationalInstitutionDto } from './dto';

@Injectable()
export class EducationalInstitutionsService {
  constructor(
    @InjectRepository(EducationalInstitution)
    private readonly institutionRepository: Repository<EducationalInstitution>,
  ) {}

  async create(createEducationalInstitutionDto: CreateEducationalInstitutionDto): Promise<EducationalInstitution> {
    const { nombre } = createEducationalInstitutionDto;

    const existing = await this.institutionRepository.findOne({
      where: { nombre },
      withDeleted: true,
    });

    if (existing && !existing.deletedAt)
      throw new ConflictException(`Ya existe una institución educativa con el nombre '${nombre}'`);

    if (existing && existing.deletedAt) {
      await this.institutionRepository.restore(existing.id);
      return this.institutionRepository.findOne({ where: { id: existing.id } });
    }

    const institution = this.institutionRepository.create({ nombre });
    return this.institutionRepository.save(institution);
  }

  findAll(): Promise<EducationalInstitution[]> {
    return this.institutionRepository.find();
  }

  async findOne(id: string): Promise<EducationalInstitution> {
    const institution = await this.institutionRepository.findOne({ where: { id } });
    if (!institution) throw new NotFoundException(`No se encontró una institución educativa con el ID ${id}`);
    return institution;
  }

  async update(id: string, updateEducationalInstitutionDto: UpdateEducationalInstitutionDto): Promise<EducationalInstitution> {
    const institution = await this.findOne(id);

    if (updateEducationalInstitutionDto.nombre) {
      const existing = await this.institutionRepository.findOne({
        where: { nombre: updateEducationalInstitutionDto.nombre },
        withDeleted: false,
      });

      if (existing && existing.id !== id)
        throw new ConflictException(`Ya existe una institución educativa con el nombre '${updateEducationalInstitutionDto.nombre}'`);
    }

    return this.institutionRepository.save({ ...institution, ...updateEducationalInstitutionDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.institutionRepository.softDelete(id);
    if (result.affected === 0)  throw new NotFoundException(`No se encontró una institución educativa con el ID ${id}`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.institutionRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró una institución educativa con el ID ${id}`);
  }
}
