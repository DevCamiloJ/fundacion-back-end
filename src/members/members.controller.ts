import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, UseInterceptors, UploadedFile  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { CreateMemberDto, UpdateMemberDto } from './dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  create(@Body() createMemberDto: CreateMemberDto, @UploadedFile() imagen: Express.Multer.File) {
    return this.membersService.create({...createMemberDto, imagenUrl: imagen ? imagen.path: null });
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
