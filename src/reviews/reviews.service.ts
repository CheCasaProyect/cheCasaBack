import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from 'src/dtos/createReviewDto';
import { Property } from 'src/entities/property.entity';
import { Review } from 'src/entities/review.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createReview(newReview: CreateReviewDto): Promise<Review> {
    const property = await this.propertyRepository.findOne({
      where: { id: newReview.propertyId },
    });
    const user = await this.userRepository.findOne({
      where: { id: newReview.userId },
    });

    if (!property || !user) {
      throw new NotFoundException('Usuario o Propiedad no encontrados');
    }

    const review = this.reviewRepository.create({
      comment: newReview.comment,
      rating: newReview.rating,
      property: property,
      user: user,
      reviewDate: new Date(),
    });

    return this.reviewRepository.save(review);
  }

  async getAllPropertyReviews(propertyId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { property: { id: propertyId } },
    });
  }

  async getAllReviews(): Promise<Review[]> {
    return this.reviewRepository.find();
  }
}
