import { OnApplicationShutdown } from "@nestjs/common";
import type { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";
export declare class DatabaseService implements OnApplicationShutdown {
    private readonly pool;
    private readonly logger;
    constructor(pool: Pool);
    ping(): Promise<void>;
    query<T extends QueryResultRow = QueryResultRow>(text: string, values?: unknown[]): Promise<QueryResult<T>>;
    connect(): Promise<PoolClient>;
    transaction<T>(operation: (client: PoolClient) => Promise<T>): Promise<T>;
    onApplicationShutdown(): Promise<void>;
}
