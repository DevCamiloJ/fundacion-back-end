import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  // Verifica si el nombre de usuario está tomado (existe en la base de datos)
  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return !!user;  // Retorna true si el usuario existe, false si no
  }

  // Verifica si el correo electrónico está tomado (existe en la base de datos)
  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user; // Retorna true si el usuario existe, false si no
  }

  // Crea un nuevo usuario después de verificar que el email y el nombre de usuario no estén en uso
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username } = createUserDto;
    
    // Verificar que el correo electrónico no esté en uso
    const emailTaken = await this.isEmailTaken(email);
    // Verificar que el nombre de usuario no esté en uso
    const usernameTaken = await this.isUsernameTaken(username);

    // Lanzar excepción si el correo o el nombre de usuario ya están en uso
    if (emailTaken) throw new ConflictException('El correo electrónico ya está en uso');
    if (usernameTaken) throw new ConflictException('El nombre de usuario ya está en uso');
    
    // Crear y guardar el usuario en la base de datos
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  // Actualiza un usuario después de verificar que el email y el nombre de usuario no estén en uso
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id); // Buscar el usuario actual por ID

    // Verificar unicidad de email en el proceso de actualización
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailTaken = await this.isEmailTaken(updateUserDto.email);
      if (emailTaken) throw new ConflictException('El correo electrónico ya está en uso');
    }

    // Verificar unicidad de username en el proceso de actualización
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const usernameTaken = await this.isUsernameTaken(updateUserDto.username);
      if (usernameTaken) throw new ConflictException('El nombre de usuario ya está en uso');
    }

    // Actualizar los datos del usuario
    const newUser = this.usersRepository.create({ ...user, ...updateUserDto });
    return this.usersRepository.save(newUser); // Guardar el usuario actualizado
  }

  // Obtiene todos los usuarios
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Obtiene todos los usuarios que han sido eliminados
  findDeletedUsers(): Promise<User[]> {
    return this.usersRepository.find({ where: { deletedAt: Not(IsNull()) } });
  }

  // Busca un usuario por su ID. Lanza un error si no se encuentra.
  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }, withDeleted: true });
    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return user;
  }

  // Busca un usuario por su nombre de usuario. Lanza un error si no se encuentra.
  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username }, withDeleted: true });
    if (!user) throw new NotFoundException(`Usuario con nombre de usuario ${username} no encontrado`);
    return user;
  }

  // Busca un usuario por su correo electrónico. Lanza un error si no se encuentra.
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email }, withDeleted: true });
    if (!user) throw new NotFoundException(`Usuario con correo electrónico ${email} no encontrado`);
    return user;
  }

  // Elimina un usuario mediante un "soft delete" (no lo borra físicamente).
  async remove(id: string): Promise<string> {
    const user = await this.usersRepository.softDelete(id); // Realiza un soft delete
    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return `Usuario con ID ${id} eliminado correctamente`; // Mensaje de éxito
  }

  // Restaura un usuario previamente eliminado (soft delete).
  async restore(id: string): Promise<string> {
    const restoreResponse = await this.usersRepository.restore(id); // Restaurar usuario
    if (!restoreResponse.affected) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return `Usuario con ID ${id} restaurado correctamente`; // Mensaje de éxito
  }
}
