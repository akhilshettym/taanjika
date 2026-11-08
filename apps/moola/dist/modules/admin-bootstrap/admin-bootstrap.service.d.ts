import { OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FirebaseAdminService } from "../firebase/firebase-admin.service";
import { DatabaseService } from "../database/database.service";
import { UsersRepository } from "../users/users.repository";
export declare class AdminBootstrapService implements OnApplicationBootstrap {
    private readonly config;
    private readonly firebase;
    private readonly database;
    private readonly usersRepository;
    private readonly logger;
    constructor(config: ConfigService, firebase: FirebaseAdminService, database: DatabaseService, usersRepository: UsersRepository);
    onApplicationBootstrap(): Promise<void>;
    private required;
}
