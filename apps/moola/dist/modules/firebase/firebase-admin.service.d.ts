import { ConfigService } from "@nestjs/config";
import { type Auth } from "firebase-admin/auth";
export declare class FirebaseAdminService {
    private readonly firebaseAuth;
    constructor(config: ConfigService);
    get auth(): Auth;
}
