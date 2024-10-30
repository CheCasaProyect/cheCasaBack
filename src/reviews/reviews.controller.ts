import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from 'src/dtos/createReviewDto';
import { Review } from 'src/entities/review.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post('newReview')
  @HttpCode(HttpStatus.CREATED)
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
