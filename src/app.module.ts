import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getTelegramConfig } from './configs/telegram.config';
import { TelegramModule } from './telegram/telegram.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { getMongoConfig } from './configs/mongo.config';
import { ReviewModule } from './review/review.module';
import { FilesModule } from './files/files.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig
        }),
        TelegramModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getTelegramConfig
        }),
        AuthModule,
        TopPageModule,
        ProductModule,
        ReviewModule,
        FilesModule
    ]
})
export class AppModule {}
