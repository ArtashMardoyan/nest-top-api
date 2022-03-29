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
    ValidationPipe,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';

import { UserEmailDecorator } from '../decorators/user-email.decorator';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
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
    async delete(@Param('id', IdValidationPipe) id: string, @UserEmailDecorator() email: string) {
        const deletedReview = await this.reviewService.delete(id);

        if (!deletedReview) {
            throw new NotFoundException(REVIEW_NOT_FOUND_ERROR);
        } else if (!email) {
            throw new UnauthorizedException();
        }

        return deletedReview;
    }

    @HttpCode(HttpStatus.OK)
    @Get('byProduct/:productId')
    async findByProductId(@Param('productId', IdValidationPipe) productId: string) {
        return this.reviewService.findByProductId(productId);
    }
}
