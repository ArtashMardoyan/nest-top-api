import {
    Body,
    Post,
    HttpCode,
    UsePipes,
    Controller,
    HttpStatus,
    ValidationPipe,
    BadRequestException
} from '@nestjs/common';

import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    async register(@Body() dto: AuthDto) {
        const oldUser = await this.authService.findUser(dto.login);

        if (oldUser) {
            throw new BadRequestException(ALREADY_REGISTERED_ERROR);
        }

        return this.authService.createUser(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    async login(@Body() { login, password }: AuthDto) {
        const { email } = await this.authService.validateUser(login, password);

        return this.authService.login(email);
    }
}
