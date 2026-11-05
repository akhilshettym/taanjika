import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/database/database.module";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["../../.env", ".env"],
      ignoreEnvFile: process.env.NODE_ENV === "production",
    }),
    DatabaseModule,
    HealthModule,
  ],
})
export class AppModule {}
