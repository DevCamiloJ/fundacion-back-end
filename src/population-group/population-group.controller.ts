import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PopulationGroupService } from './population-group.service';
import { CreatePopulationGroupDto } from './dto/create-population-group.dto';
import { UpdatePopulationGroupDto } from './dto/update-population-group.dto';

@Controller('population-group')
export class PopulationGroupController {
  constructor(private readonly populationGroupService: PopulationGroupService) {}

  @Post()
  create(@Body() createPopulationGroupDto: CreatePopulationGroupDto) {
    return this.populationGroupService.create(createPopulationGroupDto);
  }

  @Get()
  findAll() {
    return this.populationGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.populationGroupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePopulationGroupDto: UpdatePopulationGroupDto) {
    return this.populationGroupService.update(id, updatePopulationGroupDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.populationGroupService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.populationGroupService.restore(id);
  }
}
