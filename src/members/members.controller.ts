import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe  } from '@nestjs/common';

import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { CreateMemberDto, UpdateMemberDto } from './dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.membersService.update(id, updateMemberDto);
  }

  @Patch('inactivate/:id')
  inactivate(@Param('id') id: string): Promise<void> {
    return this.membersService.inactivateMember(id);
  }
}
