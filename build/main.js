"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    await app.listen(5000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map