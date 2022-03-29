import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

    async create(dto: CreateProductDto) {
        return await this.productModel.create(dto);
    }

    async findById(id: string) {
        return this.productModel.findById(id).exec();
    }

    async delete(id: string) {
        return this.productModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, dto: CreateProductDto) {
        return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async find(dto: FindProductDto) {
        return this.productModel
            .aggregate([
                { $match: { categories: dto.category } },
                { $sort: { _id: 1 } },
                { $limit: dto.limit },
                { $lookup: { from: 'Review', localField: '_id', foreignField: 'productId', as: 'reviews' } },
                { $addFields: { reviewCount: { $size: '$reviews' }, reviewAvg: { $avg: '$reviews.rating' } } }
            ])
            .exec();
    }
}