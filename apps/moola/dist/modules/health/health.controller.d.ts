import { DatabaseService } from "../database/database.service";
export declare class HealthController {
    private readonly database;
    constructor(database: DatabaseService);
    check(): Promise<{
        status: "ok";
        service: "moola";
        database: "connected";
        timestamp: string;
    }>;
}
