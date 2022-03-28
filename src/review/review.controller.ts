import {
    Get,
    Body,
    Post,
    Param,
    Delete,
    UsePipes,
    HttpCode,
    UseGuards,
    Controller,
    HttpStatus,
    HttpException,
    ValidationPipe
} from '@nestjs/common';

import { REVIEW_NOT_FOUND_ERROR } from './review.constants';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
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
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: string) {
        const deletedReview = await this.reviewService.delete(id);

        if (!deletedReview) {
            throw new HttpException(REVIEW_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
        }

        return deletedReview;
    }

    @HttpCode(HttpStatus.OK)
    @Get('byProduct/:productId')
    async findByProductId(@Param('productId') productId: string) {
        return this.reviewService.findByProductId(productId);
    }
}
