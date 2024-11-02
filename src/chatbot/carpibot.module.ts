import { Module } from '@nestjs/common';
import { CarpibotController } from './carpibot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { CarpiBot } from 'src/entities/carpiBot.entity';
import { CarpiChatGateway } from './carpibot.gateway';
import { CarpibotService } from './carpibot.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, CarpiBot])],
  controllers: [CarpibotController],
  providers: [CarpiChatGateway, CarpibotService],
})
export class CarpiBotModule {}
