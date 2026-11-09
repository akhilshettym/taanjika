"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.setGlobalPrefix("api/v1");
    app.enableCors({
        origin: (process.env.CORS_ORIGINS ?? "http://localhost:3000")
            .split(",")
            .map((origin) => origin.trim())
            .filter(Boolean),
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    });
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    app.enableShutdownHooks();
    const port = Number(process.env.PORT ?? 4000);
    await app.listen(port, "0.0.0.0");
}
void bootstrap();
//# sourceMappingURL=main.js.map