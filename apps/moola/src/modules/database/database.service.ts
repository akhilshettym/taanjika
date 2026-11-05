import {
  Inject,
  Injectable,
  OnApplicationShutdown,
} from "@nestjs/common";
import type { Pool } from "pg";
import { PG_POOL } from "./database.constants";

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async ping(): Promise<void> {
    await this.pool.query("SELECT 1");
  }

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }
}
