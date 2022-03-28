import {
    Get,
    Body,
    Post,
    Param,
    Delete,
    UsePipes,
    HttpCode,
    Controller,
    HttpStatus,
    HttpException,
    ValidationPipe
} from '@nestjs/common';

import { REVIEW_NOT_FOUND_ERROR } from './review.constants';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: string) {
        const deletedReview = await this.reviewService.delete(id);

        if (!deletedReview) {
            throw new HttpException(REVIEW_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
        }

        return deletedReview;
    }

    @Get('byProduct/:productId')
    @HttpCode(HttpStatus.OK)
    async findByProductId(@Param('productId') productId: string) {
        return this.reviewService.findByProductId(productId);
    }
}
