import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import * as Joi from '@hapi/joi';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';

@Module({
    imports: [ConfigModule.forRoot({
        validationSchema: Joi.object({
            POSTGRES_HOST: Joi.string().required(),
            POSTGRES_PORT: Joi.number().required(),
            POSTGRES_USER: Joi.string().required(),
            POSTGRES_PASSWORD: Joi.string().required(),
            POSTGRES_DB: Joi.string().required(),
            PORT: Joi.number(),
            GOOGLE_CLIENT_ID: Joi.string().required(),
            GOOGLE_CLIENT_SECRET: Joi.string().required()
        })
    }), 
    DatabaseModule, UsersModule, AuthModule, TrainingModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
