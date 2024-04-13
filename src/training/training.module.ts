import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/users.entity';
import TrainingSession from './training-sessions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, TrainingSession])],
  controllers: [TrainingController],
  providers: [TrainingService]
})
export class TrainingModule {}
