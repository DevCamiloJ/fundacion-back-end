import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FamilyCore } from './entities/family-core.entity';
import { Repository } from 'typeorm';
import { CreateFamilyCoreDto } from './dto/create-family-core.dto';
import { UpdateFamilyCoreDto } from './dto/update-family-core.dto';

@Injectable()
export class FamilyCoreService {
  constructor(
    @InjectRepository(FamilyCore)
    private readonly familyCoreRepository: Repository<FamilyCore>,
  ) {}

  async create(createFamilyCoreDto: CreateFamilyCoreDto): Promise<FamilyCore> {
    const { nombre } = createFamilyCoreDto;

    const existingFamilyCore = await this.familyCoreRepository.findOne({
      where: { nombre },
      withDeleted: true,
    });

    if (existingFamilyCore && !existingFamilyCore.deletedAt) 
      throw new ConflictException(`Ya existe un núcleo familiar con el nombre '${nombre}'`);

    if (existingFamilyCore && existingFamilyCore.deletedAt) {
      await this.familyCoreRepository.restore(existingFamilyCore.id);
      return this.familyCoreRepository.findOne({ where: { id: existingFamilyCore.id } });
    }

    const familyCore = this.familyCoreRepository.create(createFamilyCoreDto);
    return this.familyCoreRepository.save(familyCore);
  }

  async update(id: string, updateFamilyCoreDto: UpdateFamilyCoreDto): Promise<FamilyCore> {
    const { nombre } = updateFamilyCoreDto;

    if (nombre) {
      const existingFamilyCore = await this.familyCoreRepository.findOne({
        where: { nombre },
        withDeleted: false,
      });

      if (existingFamilyCore && existingFamilyCore.id !== id)
        throw new ConflictException(`Ya existe un núcleo familiar con el nombre '${nombre}'`);
    }

    const familyCore = await this.findOne(id);
    return this.familyCoreRepository.save({ ...familyCore, ...updateFamilyCoreDto });
  }

  async findOne(id: string): Promise<FamilyCore> {
    const familyCore = await this.familyCoreRepository.findOne({ where: { id } });
    if (!familyCore) throw new NotFoundException(`No se encontró un núcleo familiar con el ID '${id}'`);
    return familyCore;
  }

  findAll(): Promise<FamilyCore[]> {
    return this.familyCoreRepository.find();
  }

  async remove(id: string): Promise<void> {
    const result = await this.familyCoreRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un núcleo familiar con el ID '${id}'`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.familyCoreRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un núcleo familiar con el ID '${id}'`);
  }
}
