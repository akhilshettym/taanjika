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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    repository;
    config;
    constructor(repository, config) {
        this.repository = repository;
        this.config = config;
    }
    async registerProfile(principal, dto) {
        if (dto.acceptedTerms !== true || dto.acceptedPrivacyPolicy !== true) {
            throw new common_1.BadRequestException("Terms and Privacy Policy acknowledgement are required.");
        }
        const termsVersion = this.config.get("TERMS_VERSION");
        const privacyVersion = this.config.get("PRIVACY_VERSION");
        if (!termsVersion || !privacyVersion)
            throw new Error("TERMS_VERSION and PRIVACY_VERSION must be configured.");
        return this.repository.registerProfile(principal, dto, termsVersion, privacyVersion);
    }
    async getProfile(principal) {
        await this.repository.syncEmailVerification(principal.uid, principal.emailVerified);
        const profile = await this.repository.findByFirebaseUid(principal.uid);
        if (!profile)
            throw new common_1.NotFoundException({
                statusCode: 404,
                error: "PROFILE_NOT_FOUND",
                message: "A Taanjika profile has not been created for this Firebase account.",
            });
        return profile;
    }
    get usersRepository() {
        return this.repository;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map