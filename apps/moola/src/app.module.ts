import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/database/database.module";
import { FirebaseModule } from "./modules/firebase/firebase.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { AdminBootstrapModule } from "./modules/admin-bootstrap/admin-bootstrap.module";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["../../.env", ".env"],
      ignoreEnvFile: process.env.NODE_ENV === "production",
    }),
    DatabaseModule,
    FirebaseModule,
    UsersModule,
    AuthModule,
    AdminBootstrapModule,
    HealthModule,
  ],
})
export class AppModule {}
