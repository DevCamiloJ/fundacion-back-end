import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Crear un nuevo usuario
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // Obtener todos los usuarios
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Obtener todos los usuarios que han sido eliminados
  @Get('deleted')
  findDeletedUsers(): Promise<User[]> {
    return this.usersService.findDeletedUsers();
  }

  // Obtener un usuario por su ID
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  // Obtener un usuario por su correo electrónico
  @Get('email/:email')
  findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  // Obtener un usuario por su nombre de usuario
  @Get('username/:username')
  findOneByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.findOneByUsername(username);
  }

  // Verificar si el correo electrónico está tomado
  @Get('email-taken/:email')
  async isEmailTaken(@Param('email') email: string): Promise<{ emailTaken: boolean }> {
    const taken = await this.usersService.isEmailTaken(email);
    return { emailTaken: taken };
  }

  // Verificar si el nombre de usuario está tomado
  @Get('username-taken/:username')
  async isUsernameTaken(@Param('username') username: string): Promise<{ usernameTaken: boolean }> {
    const taken = await this.usersService.isUsernameTaken(username);
    return { usernameTaken: taken };
  }

  // Actualizar un usuario
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  // Eliminar un usuario (soft delete)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.usersService.remove(id);
  }

  // Restaurar un usuario eliminado
  @Patch(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.usersService.restore(id);
  }
}
