import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { UserModel } from './user.model';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

    async createUser(dto: AuthDto) {
        const salt = genSaltSync(10);

        const newUser = new this.userModel({
            email: dto.login,
            passwordHash: hashSync(dto.password, salt)
        });

        return newUser.save();
    }

    async findUser(email: string) {
        return this.userModel.findOne({ email }).exec();
    }
}
