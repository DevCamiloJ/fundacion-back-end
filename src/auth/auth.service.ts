import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      const matchPassword = await this.validatePassword(password, user.password);
      if (matchPassword) return user;
      return null;
    } catch(e) {
      return null;
    }
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return { user, access_token: this.jwtService.sign(payload) };
  }

  private async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
