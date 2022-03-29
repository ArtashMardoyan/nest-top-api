import {
    Get,
    Put,
    Body,
    Post,
    Param,
    Delete,
    UsePipes,
    HttpCode,
    Controller,
    HttpStatus,
    ValidationPipe,
    NotFoundException
} from '@nestjs/common';

import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductService } from './product.service';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async get(@Param('id', IdValidationPipe) id: string) {
        const product = await this.productService.findById(id);

        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }

        return product;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id', IdValidationPipe) id: string) {
        const product = await this.productService.delete(id);

        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }

        return product;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    async update(@Param('id', IdValidationPipe) id: string, @Body() dto: Omit<ProductModel, '_id'>) {
        const product = await this.productService.update(id, dto);

        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }

        return product;
    }

    @Post('find')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    async find(@Body() dto: FindProductDto) {
        return this.productService.find(dto);
    }
}
