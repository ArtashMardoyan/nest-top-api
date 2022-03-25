import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: string) {}

    @Get('getByProduct/:productId')
    @HttpCode(HttpStatus.OK)
    async getByProduct(@Param('productId') productId: string) {}
}
