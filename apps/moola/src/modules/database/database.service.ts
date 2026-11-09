import { Inject, Injectable, Logger, OnApplicationShutdown } from "@nestjs/common";
import type { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";
import { PG_POOL } from "./database.constants";

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@Inject(PG_POOL) private readonly pool: Pool) {
    this.pool.on("error", (error) => {
      this.logger.error("Unexpected PostgreSQL pool error.", error.stack);
    });
  }

  async ping(): Promise<void> {
    await this.pool.query("SELECT 1");
  }

  query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values: unknown[] = [],
  ): Promise<QueryResult<T>> {
    return this.pool.query<T>(
      text,
      values as (string | number | boolean | Date | null | string[])[],
    );
  }

  connect(): Promise<PoolClient> {
    return this.pool.connect();
  }

  async transaction<T>(operation: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await operation(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }
}
