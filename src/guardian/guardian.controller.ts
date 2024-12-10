import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { GuardianService } from './guardian.service';

import { CreateGuardianDto, UpdateGuardianDto } from './dto';

@Controller('guardian')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}

  @Post()
  create(@Body() createGuardianDto: CreateGuardianDto) {
    return this.guardianService.create(createGuardianDto);
  }

  @Get()
  findAll() {
    return this.guardianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.guardianService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateGuardianDto: UpdateGuardianDto) {
    return this.guardianService.update(id, updateGuardianDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.guardianService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.guardianService.restore(id);
  }

  @Get('is-document-unique')
  async isDocumentUnique(@Query('numeroDocumento') numeroDocumento: string): Promise<{ unique: boolean }> {
    const unique = await this.guardianService.isDocumentNumberUnique(numeroDocumento);
    return { unique };
  }
}
