"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const database_constants_1 = require("./database.constants");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    pool;
    logger = new common_1.Logger(DatabaseService_1.name);
    constructor(pool) {
        this.pool = pool;
        this.pool.on("error", (error) => {
            this.logger.error("Unexpected PostgreSQL pool error.", error.stack);
        });
    }
    async ping() {
        await this.pool.query("SELECT 1");
    }
    query(text, values = []) {
        return this.pool.query(text, values);
    }
    connect() {
        return this.pool.connect();
    }
    async transaction(operation) {
        const client = await this.pool.connect();
        try {
            await client.query("BEGIN");
            const result = await operation(client);
            await client.query("COMMIT");
            return result;
        }
        catch (error) {
            await client.query("ROLLBACK");
            throw error;
        }
        finally {
            client.release();
        }
    }
    async onApplicationShutdown() {
        await this.pool.end();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_constants_1.PG_POOL)),
    __metadata("design:paramtypes", [Function])
], DatabaseService);
//# sourceMappingURL=database.service.js.map