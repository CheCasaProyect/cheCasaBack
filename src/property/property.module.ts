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

@Module({
  imports: [
    HttpModule,
    ReservationsModule,
    TypeOrmModule.forFeature([Property]),
  ],
  controllers: [PropertyController],
  providers: [
    PropertyService,
    PropertyRepository,
    CloudinaryService,
    CloudinaryConfig,
  ],
  exports: [PropertyRepository],
})
export class PropertyModule {}
