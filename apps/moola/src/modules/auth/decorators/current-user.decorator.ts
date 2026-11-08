import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedRequest, FirebasePrincipal } from "../guards/firebase-auth.guard";
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): FirebasePrincipal =>
    context.switchToHttp().getRequest<AuthenticatedRequest>().user,
);
