import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { EpsService } from './eps.service';
import { CreateEpsDto } from './dto';

@Controller('eps')
export class EpsController {
  constructor(private readonly epsService: EpsService) {}

  @Post()
  create(@Body() createEpsDto: CreateEpsDto) {
    return this.epsService.create(createEpsDto);
  }

  @Get()
  findAll() {
    return this.epsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.epsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEpsDto: Partial<CreateEpsDto>) {
    return this.epsService.update(id, updateEpsDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.epsService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.epsService.restore(id);
  }
}
