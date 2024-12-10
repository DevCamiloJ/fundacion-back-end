import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { EthnicGroupService } from './ethnic-group.service';
import { CreateEthnicGroupDto, UpdateEthnicGroupDto } from './dto';

@Controller('ethnic-group')
export class EthnicGroupController {
  constructor(private readonly ethnicGroupService: EthnicGroupService) {}

  @Post()
  create(@Body() createEthnicGroupDto: CreateEthnicGroupDto) {
    return this.ethnicGroupService.create(createEthnicGroupDto);
  }

  @Get()
  findAll() {
    return this.ethnicGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ethnicGroupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEthnicGroupDto: UpdateEthnicGroupDto) {
    return this.ethnicGroupService.update(id, updateEthnicGroupDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ethnicGroupService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.ethnicGroupService.restore(id);
  }
}
