import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersService } from "../../users/users.service";
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    private readonly users;
    constructor(reflector: Reflector, users: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
