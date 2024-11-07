import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { User } from 'src/entities/users.entity';
import { Property } from 'src/entities/property.entity';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Property]), PropertyModule],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
