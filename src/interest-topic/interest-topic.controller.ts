import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { InterestTopicService } from './interest-topic.service';
import { CreateInterestTopicDto, UpdateInterestTopicDto } from './dto';

@Controller('interest-topic')
export class InterestTopicController {
  constructor(private readonly interestTopicService: InterestTopicService) {}

  @Post()
  create(@Body() createInterestTopicDto: CreateInterestTopicDto) {
    return this.interestTopicService.create(createInterestTopicDto);
  }

  @Get()
  findAll() {
    return this.interestTopicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.interestTopicService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateInterestTopicDto: UpdateInterestTopicDto) {
    return this.interestTopicService.update(id, updateInterestTopicDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.interestTopicService.remove(id);
  }

  @Post(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.interestTopicService.restore(id);
  }
}
