import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { FirebaseModule } from "../firebase/firebase.module";
import { UsersModule } from "../users/users.module";
import { AdminBootstrapService } from "./admin-bootstrap.service";

@Module({
  imports: [DatabaseModule, FirebaseModule, UsersModule],
  providers: [AdminBootstrapService],
})
export class AdminBootstrapModule {}
