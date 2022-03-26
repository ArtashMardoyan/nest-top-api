import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post } from '@nestjs/common';

import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: string) {
        const deletedReview = this.reviewService.delete(id);

        if (!deletedReview) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return deletedReview;
    }

    @Get('byProduct/:productId')
    @HttpCode(HttpStatus.OK)
    async findByProductId(@Param('productId') productId: string) {
        return this.reviewService.findByProductId(productId);
    }
}
