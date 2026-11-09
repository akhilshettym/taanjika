import { ConfigService } from "@nestjs/config";
import type { FirebasePrincipal } from "../auth/guards/firebase-auth.guard";
import type { RegisterProfileDto } from "../auth/dto/register-profile.dto";
import { UsersRepository } from "./users.repository";
export declare class UsersService {
    private readonly repository;
    private readonly config;
    constructor(repository: UsersRepository, config: ConfigService);
    registerProfile(principal: FirebasePrincipal, dto: RegisterProfileDto): Promise<import("./users.repository").UserProfileRecord>;
    getProfile(principal: FirebasePrincipal): Promise<import("./users.repository").UserProfileRecord>;
    get usersRepository(): UsersRepository;
}
