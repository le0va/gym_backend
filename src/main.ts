import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors(
        {
            origin: '*',
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            credentials: true
        });
    // app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        })
    );
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    await app.listen(5000, '0.0.0.0');
}
bootstrap();
