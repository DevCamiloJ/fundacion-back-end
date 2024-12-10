import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { DisabilityService } from './disability.service';
import { CreateDisabilityDto, UpdateDisabilityDto } from './dto';

@Controller('disability')
export class DisabilityController {
  constructor(private readonly disabilityService: DisabilityService) {}

  @Post()
  create(@Body() createDisabilityDto: CreateDisabilityDto) {
    return this.disabilityService.create(createDisabilityDto);
  }

  @Get()
  findAll() {
    return this.disabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.disabilityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDisabilityDto: UpdateDisabilityDto) {
    return this.disabilityService.update(id, updateDisabilityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.disabilityService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.disabilityService.restore(id);
  }
}
