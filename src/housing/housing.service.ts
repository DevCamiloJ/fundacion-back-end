import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Housing } from './entities/housing.entity';
import { CreateHousingDto, UpdateHousingDto } from './dto';

@Injectable()
export class HousingService {
  constructor(
    @InjectRepository(Housing)
    private readonly housingRepository: Repository<Housing>,
  ) {}

  async create(createHousingDto: CreateHousingDto): Promise<Housing> {
    const housing = this.housingRepository.create(createHousingDto);
    return await this.housingRepository.save(housing);
  }

  findAll(): Promise<Housing[]> {
    return this.housingRepository.find();
  }

  async findOne(id: string): Promise<Housing> {
    const housing = await this.housingRepository.findOne({ where: { id } });
    if (!housing) throw new NotFoundException(`No se encontró una vivienda con el ID ${id}`);
    return housing;
  }

  async update(id: string, updateHousingDto: UpdateHousingDto): Promise<Housing> {
    const housing = await this.findOne(id);
    return this.housingRepository.save({ ...housing, ...updateHousingDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.housingRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró una vivienda con el ID ${id}`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.housingRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró una vivienda con el ID ${id}`);
  }
}
