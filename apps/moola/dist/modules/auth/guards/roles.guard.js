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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const users_service_1 = require("../../users/users.service");
const roles_decorator_1 = require("../decorators/roles.decorator");
let RolesGuard = class RolesGuard {
    reflector;
    users;
    constructor(reflector, users) {
        this.reflector = reflector;
        this.users = users;
    }
    async canActivate(context) {
        const required = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!required?.length)
            return true;
        const request = context.switchToHttp().getRequest();
        if (!request.user?.emailVerified)
            throw new common_1.ForbiddenException("Verify your email address first.");
        const profile = await this.users.getProfile(request.user);
        if (profile.status !== "ACTIVE" || !required.some((role) => profile.roles.includes(role))) {
            throw new common_1.ForbiddenException("You do not have permission to access this resource.");
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        users_service_1.UsersService])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map