import { Controller, Get, Post, Body, Patch, Param, Delete,Res,UnauthorizedException, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() body: { email: string; password: string }) {
    return this.authService.create(body.email, body.password);
  }
  @Post('login')
  async login(@Body() body: { email: string; password: string },@Res({ passthrough: true }) response: Response) {
    this.logger.debug(`Login attempt for ${body.email}`);
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      this.logger.warn(`Login failed for ${body.email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    response.cookie('user_id', user.id, {
      httpOnly: true,   
      secure: false,     
      maxAge: 3600000,  
      sameSite: 'lax',
    });

    this.logger.log(`User ${user.email} logged in successfully (id=${user.id})`);

    return { message: 'Successfully logged in' };
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.logger.log('User logged out');
    response.clearCookie('user_id');
    return { message: 'You have been logged out' };
  }
}
