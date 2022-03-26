import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { getMongoConfig } from './configs/mongo.config';
import { ReviewModule } from './review/review.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig
        }),
        AuthModule,
        TopPageModule,
        ProductModule,
        ReviewModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
