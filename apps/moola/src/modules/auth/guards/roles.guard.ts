import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersService } from "../../users/users.service";
import { ROLES_KEY, type AppRole } from "../decorators/roles.decorator";
import type { AuthenticatedRequest } from "./firebase-auth.guard";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly users: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<AppRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required?.length) return true;
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request.user?.emailVerified)
      throw new ForbiddenException("Verify your email address first.");
    const profile = await this.users.getProfile(request.user);
    if (profile.status !== "ACTIVE" || !required.some((role) => profile.roles.includes(role))) {
      throw new ForbiddenException("You do not have permission to access this resource.");
    }
    return true;
  }
}
