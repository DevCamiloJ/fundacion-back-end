import { Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RequestWithUser } from './interface';
import { LocalAuthGuard } from './guard';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }
}
