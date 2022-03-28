import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getJWTConfig } from '../configs/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModel } from './user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: UserModel,
                schemaOptions: { collection: 'User' }
            }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJWTConfig
        })
    ],
    providers: [AuthService]
})
export class AuthModule {}
