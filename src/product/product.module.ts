import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductModel } from './product.model';

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: ProductModel,
                schemaOptions: { collection: 'Product' }
            }
        ])
    ]
})
export class ProductModule {}
