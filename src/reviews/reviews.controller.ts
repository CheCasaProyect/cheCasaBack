import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from 'src/dtos/createReviewDto';
import { Review } from 'src/entities/review.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReviewsGuard } from 'src/guards/reviews.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}
  /* @UseGuards(AuthGuard, ReviewsGuard)
  @ApiBearerAuth() */
  @HttpCode(HttpStatus.CREATED)
  @Post('newReview')
  async createReview(@Body() createReview: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(createReview);
  }

  @Get()
  async getAllReviews() {
    return this.reviewService.getAllReviews();
  }

  @Get(':propertyId')
  async getAllPropertyReviews(
    @Param('propertyId') propertyId: string,
  ): Promise<Review[]> {
    return this.reviewService.getAllPropertyReviews(propertyId);
  }
}
