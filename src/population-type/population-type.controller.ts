import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PopulationTypeService } from './population-type.service';
import { CreatePopulationTypeDto } from './dto/create-population-type.dto';
import { UpdatePopulationTypeDto } from './dto/update-population-type.dto';

@Controller('population-type')
export class PopulationTypeController {
  constructor(private readonly populationTypeService: PopulationTypeService) {}

  @Post()
  create(@Body() createPopulationTypeDto: CreatePopulationTypeDto) {
    return this.populationTypeService.create(createPopulationTypeDto);
  }

  @Get()
  findAll() {
    return this.populationTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.populationTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePopulationTypeDto: UpdatePopulationTypeDto) {
    return this.populationTypeService.update(id, updatePopulationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.populationTypeService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.populationTypeService.restore(id);
  }
}
