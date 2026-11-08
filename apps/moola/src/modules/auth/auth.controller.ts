import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { RegisterProfileDto } from "./dto/register-profile.dto";
import { FirebaseAuthGuard, type FirebasePrincipal } from "./guards/firebase-auth.guard";

@Controller("auth")
@UseGuards(FirebaseAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("register") register(
    @CurrentUser() user: FirebasePrincipal,
    @Body() dto: RegisterProfileDto,
  ) {
    return this.authService.register(user, dto);
  }
  @Post("sync") sync(@CurrentUser() user: FirebasePrincipal, @Body() dto: RegisterProfileDto) {
    return this.authService.sync(user, dto);
  }
  @Get("me") me(@CurrentUser() user: FirebasePrincipal) {
    return this.authService.me(user);
  }
}
