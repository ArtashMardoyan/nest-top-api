import { Controller, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: AuthDto) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: AuthDto) {}
}
