import { Module } from '@nestjs/common';

import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';

@Module({
    imports: [AuthModule, TopPageModule, ProductModule, ReviewModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}