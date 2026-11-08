import { Module } from "@nestjs/common";
import { FirebaseModule } from "../firebase/firebase.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FirebaseAuthGuard } from "./guards/firebase-auth.guard";

@Module({
  imports: [FirebaseModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthGuard],
})
export class AuthModule {}
