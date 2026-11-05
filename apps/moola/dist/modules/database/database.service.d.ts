import { OnApplicationShutdown } from "@nestjs/common";
import type { Pool } from "pg";
export declare class DatabaseService implements OnApplicationShutdown {
    private readonly pool;
    constructor(pool: Pool);
    ping(): Promise<void>;
    onApplicationShutdown(): Promise<void>;
}
