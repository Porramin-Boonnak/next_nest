import { Controller, Get, Post, Body, Patch, Param, Delete,Res,UnauthorizedException } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() body: { email: string; password: string }) {
    return this.authService.create(body.email, body.password);
  }
  @Post('login')
  async login(@Body() body: { email: string; password: string },@Res({ passthrough: true }) response: Response) {
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    response.cookie('user_id', user.id, {
      httpOnly: true,   
      secure: false,     
      maxAge: 3600000,  
      sameSite: 'lax',
    });

    return { message: 'Successfully logged in' };
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('user_id');
    return { message: 'You have been logged out' };
  }
}
