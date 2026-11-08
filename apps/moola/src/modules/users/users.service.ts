import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { FirebasePrincipal } from "../auth/guards/firebase-auth.guard";
import type { RegisterProfileDto } from "../auth/dto/register-profile.dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly config: ConfigService,
  ) {}

  async registerProfile(principal: FirebasePrincipal, dto: RegisterProfileDto) {
    if (dto.acceptedTerms !== true || dto.acceptedPrivacyPolicy !== true) {
      throw new BadRequestException("Terms and Privacy Policy acknowledgement are required.");
    }
    const termsVersion = this.config.get<string>("TERMS_VERSION");
    const privacyVersion = this.config.get<string>("PRIVACY_VERSION");
    if (!termsVersion || !privacyVersion)
      throw new Error("TERMS_VERSION and PRIVACY_VERSION must be configured.");
    return this.repository.registerProfile(principal, dto, termsVersion, privacyVersion);
  }

  async getProfile(principal: FirebasePrincipal) {
    await this.repository.syncEmailVerification(principal.uid, principal.emailVerified);
    const profile = await this.repository.findByFirebaseUid(principal.uid);
    if (!profile)
      throw new NotFoundException({
        statusCode: 404,
        error: "PROFILE_NOT_FOUND",
        message: "A Taanjika profile has not been created for this Firebase account.",
      });
    return profile;
  }

  get usersRepository(): UsersRepository {
    return this.repository;
  }
}
