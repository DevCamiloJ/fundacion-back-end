import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { HousingService } from './housing.service';
import { CreateHousingDto, UpdateHousingDto } from './dto';

@Controller('housing')
export class HousingController {
  constructor(private readonly housingService: HousingService) {}

  @Post()
  create(@Body() createHousingDto: CreateHousingDto) {
    return this.housingService.create(createHousingDto);
  }

  @Get()
  findAll() {
    return this.housingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.housingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateHousingDto: UpdateHousingDto) {
    return this.housingService.update(id, updateHousingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.housingService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.housingService.restore(id);
  }
}
