import { Controller, Get, Post, Patch, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';

import { CitiesService } from './cities.service';
import { CreateCityDto, UpdateCityDto } from './dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.citiesService.findOne(id);
  }

  @Get('departamento/:departmentId')
  findByDepartment(@Param('departmentId', ParseUUIDPipe) departmentId: string) {
    return this.citiesService.findByDepartment(departmentId);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.citiesService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.citiesService.restore(id);
  }
}
