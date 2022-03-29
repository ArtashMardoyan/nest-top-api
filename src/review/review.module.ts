import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { TelegramModule } from '../telegram/telegram.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewModel } from './review.model';

@Module({
    controllers: [ReviewController],
    providers: [ReviewService],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: ReviewModel,
                schemaOptions: { collection: 'Review' }
            }
        ]),
        TelegramModule
    ]
})
export class ReviewModule {}
