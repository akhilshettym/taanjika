import { Injectable } from "@nestjs/common";
import type { FirebasePrincipal } from "./guards/firebase-auth.guard";
import type { RegisterProfileDto } from "./dto/register-profile.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  register(principal: FirebasePrincipal, dto: RegisterProfileDto) {
    return this.usersService.registerProfile(principal, dto);
  }
  sync(principal: FirebasePrincipal, dto: RegisterProfileDto) {
    return this.usersService.registerProfile(principal, dto);
  }
  me(principal: FirebasePrincipal) {
    return this.usersService.getProfile(principal);
  }
}
