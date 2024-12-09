import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { SisbenScoreService } from './sisben-score.service';
import { CreateSisbenScoreDto, UpdateSisbenScoreDto } from './dto';

@Controller('sisben-score')
export class SisbenScoreController {
  constructor(private readonly sisbenScoreService: SisbenScoreService) {}

  @Post()
  create(@Body() createDto: CreateSisbenScoreDto) {
    return this.sisbenScoreService.create(createDto);
  }

  @Get()
  findAll() {
    return this.sisbenScoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.sisbenScoreService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDto: UpdateSisbenScoreDto) {
    return this.sisbenScoreService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.sisbenScoreService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.sisbenScoreService.restore(id);
  }
}
