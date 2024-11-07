import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyRepository } from './property.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from 'src/files/cloudinary.service';
import { HttpModule } from '@nestjs/axios';
import { GeocodingService } from './geocodingService';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [
    HttpModule,
    ReservationsModule,
    UserModule,
    TypeOrmModule.forFeature([Property]),
  ],
  controllers: [PropertyController],
  providers: [
    PropertyService,
    PropertyRepository,
    PropertyGuard,
    CloudinaryService,
    CloudinaryConfig,
    GeocodingService,
    Property,
  ],
  exports: [PropertyRepository, GeocodingService, Property],
})
export class PropertyModule {}
