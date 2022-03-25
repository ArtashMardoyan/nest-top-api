import { Controller, HttpCode, HttpStatus, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';

import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: Omit<ProductModel, '_id'>) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async get(@Param('id') id: string) {}

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: string) {}

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() dto: Omit<ProductModel, '_id'>) {}

    @Post('find')
    @HttpCode(HttpStatus.OK)
    async find(@Body() dto: FindProductDto) {}
}
