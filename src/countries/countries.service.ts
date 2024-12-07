import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Country } from './entities/country.entity';
import { CreateCountryDto, UpdateCountryDto } from './dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countriesRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const existingCountry = await this.countriesRepository.findOne({
      where: { nombre: createCountryDto.nombre },
      withDeleted: true, // Incluir registros eliminados lógicamente.
    });
  
    if (existingCountry && !existingCountry.deletedAt)
      throw new ConflictException(`Ya existe un país con el nombre '${createCountryDto.nombre}'`);
    
    // Restaurar el país si está eliminado lógicamente.
    if (existingCountry && existingCountry.deletedAt) {
      await this.countriesRepository.restore(existingCountry.id);
      return this.countriesRepository.findOne({ where: { id: existingCountry.id } });
    }
  
    // Crear un nuevo país si no existe.
    const country = this.countriesRepository.create(createCountryDto);
    return await this.countriesRepository.save(country);
  }
  
  findAll(): Promise<Country[]> {
    return this.countriesRepository.find();
  }

  async findOne(id: string): Promise<Country> {
    const country = await this.countriesRepository.findOne({ where: { id } });
    if (!country) throw new NotFoundException(`No se encontró un país con el ID ${id}`);
    return country;
  }

  async update(id: string, updateCountryDto: UpdateCountryDto): Promise<Country> {
    const country = await this.findOne(id);

    if (updateCountryDto.nombre) {
      const existingCountry = await this.countriesRepository.findOne({
        where: { nombre: updateCountryDto.nombre },
        withDeleted: false,
      });

      if (existingCountry && existingCountry.id !== id) 
        throw new ConflictException(`Ya existe un país con el nombre '${updateCountryDto.nombre}'`);
    }

    return this.countriesRepository.save({ ...country, ...updateCountryDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.countriesRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un país con el ID ${id}`);
  }

  async restore(id: string): Promise<void> {
    const result = await this.countriesRepository.restore(id);
    if (result.affected === 0) throw new NotFoundException(`No se encontró un país con el ID ${id}`);
  }
}
