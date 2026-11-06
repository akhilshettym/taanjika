import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Controller("health")
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  async check(): Promise<{
    status: "ok";
    service: "moola";
    database: "connected";
    timestamp: string;
  }> {
    try {
      await this.database.ping();
    } catch {
      throw new ServiceUnavailableException({
        status: "error",
        service: "moola",
        database: "unavailable",
      });
    }

    return {
      status: "ok",
      service: "moola",
      database: "connected",
      timestamp: new Date().toISOString(),
    };
  }
}
