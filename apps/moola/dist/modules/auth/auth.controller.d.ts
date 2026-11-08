import { AuthService } from "./auth.service";
import { RegisterProfileDto } from "./dto/register-profile.dto";
import { type FirebasePrincipal } from "./guards/firebase-auth.guard";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(user: FirebasePrincipal, dto: RegisterProfileDto): Promise<import("../users/users.repository").UserProfileRecord>;
    sync(user: FirebasePrincipal, dto: RegisterProfileDto): Promise<import("../users/users.repository").UserProfileRecord>;
    me(user: FirebasePrincipal): Promise<import("../users/users.repository").UserProfileRecord>;
}
