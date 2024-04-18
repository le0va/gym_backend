import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import TrainingSession from './training-sessions.entity';
import { UsersModule } from 'src/users/users.module';
import User from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, TrainingSession]), UsersModule],
  controllers: [TrainingController],
  providers: [TrainingService]
})
export class TrainingModule {}
