import type { FirebasePrincipal } from "./guards/firebase-auth.guard";
import type { RegisterProfileDto } from "./dto/register-profile.dto";
import { UsersService } from "../users/users.service";
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(principal: FirebasePrincipal, dto: RegisterProfileDto): Promise<import("../users/users.repository").UserProfileRecord>;
    sync(principal: FirebasePrincipal, dto: RegisterProfileDto): Promise<import("../users/users.repository").UserProfileRecord>;
    me(principal: FirebasePrincipal): Promise<import("../users/users.repository").UserProfileRecord>;
}
