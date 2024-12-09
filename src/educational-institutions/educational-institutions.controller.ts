import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { EducationalInstitutionsService } from './educational-institutions.service';
import { CreateEducationalInstitutionDto, UpdateEducationalInstitutionDto } from './dto';

@Controller('educational-institutions')
export class EducationalInstitutionsController {
  constructor(private readonly educationalInstitutionsService: EducationalInstitutionsService) {}

  @Post()
  create(@Body() createEducationalInstitutionDto: CreateEducationalInstitutionDto) {
    return this.educationalInstitutionsService.create(createEducationalInstitutionDto);
  }

  @Get()
  findAll() {
    return this.educationalInstitutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.educationalInstitutionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEducationalInstitutionDto: UpdateEducationalInstitutionDto,
  ) {
    return this.educationalInstitutionsService.update(id, updateEducationalInstitutionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.educationalInstitutionsService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.educationalInstitutionsService.restore(id);
  }
}
