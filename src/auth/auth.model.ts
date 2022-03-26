import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class AuthModel extends TimeStamps {
    @prop({ unique: true })
    email: string;

    @prop()
    passwordHash: string;
}
