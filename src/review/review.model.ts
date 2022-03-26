import { Types } from 'mongoose';
import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class ReviewModel extends TimeStamps {
    @prop()
    name: string;

    @prop()
    title: string;

    @prop()
    description: string;

    @prop()
    rating: number;

    @prop()
    productId: Types.ObjectId;
}
