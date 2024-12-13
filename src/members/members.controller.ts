import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, UseInterceptors, UploadedFile, Res, NotFoundException, BadRequestException  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import * as path from 'path';
import * as fs from 'fs';

import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { CreateMemberDto, UpdateMemberDto } from './dto';
import { Public } from 'src/auth/decorators';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/members',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // Limite de tamaño: 5MB
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Solo se permiten imágenes'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(@Body() createMemberDto: CreateMemberDto, @UploadedFile() imagen: Express.Multer.File) {
    try {
      const imagenUrl =  imagen ? `${imagen.filename}`: null;
      return await this.membersService.create({ ...createMemberDto, imagenUrl });
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al crear miembro');
    }
  }

  @Get()
  findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Member> {
    return this.membersService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.membersService.update(id, updateMemberDto);
  }

  @Patch('inactivate/:id')
  inactivate(@Param('id') id: string): Promise<void> {
    return this.membersService.inactivateMember(id);
  }

  @Public()
  @Get('image/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = path.join('uploads', 'members', filename);
    if (!fs.existsSync(imagePath)) throw new NotFoundException(`Imagen ${filename} no encontrada`);
    return res.sendFile(path.resolve(imagePath));
  }
}
