import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { FamilyCoreService } from './family-core.service';
import { CreateFamilyCoreDto, UpdateFamilyCoreDto } from './dto';

@Controller('family-core')
export class FamilyCoreController {
  constructor(private readonly familyCoreService: FamilyCoreService) {}

  @Post()
  create(@Body() createFamilyCoreDto: CreateFamilyCoreDto) {
    return this.familyCoreService.create(createFamilyCoreDto);
  }

  @Get()
  findAll() {
    return this.familyCoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.familyCoreService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateFamilyCoreDto: UpdateFamilyCoreDto) {
    return this.familyCoreService.update(id, updateFamilyCoreDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.familyCoreService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.familyCoreService.restore(id);
  }
}
