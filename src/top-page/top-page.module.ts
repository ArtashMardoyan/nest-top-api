import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import { TopPageModel } from './top-page.model';

@Module({
    providers: [TopPageService],
    controllers: [TopPageController],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: TopPageModel,
                schemaOptions: { collection: 'TopPage' }
            }
        ])
    ]
})
export class TopPageModule {}
