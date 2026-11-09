import { IsBoolean, IsIn, IsOptional, IsString, Length, Matches } from "class-validator";

export class RegisterProfileDto {
  @IsString()
  @Length(1, 80)
  @Matches(/\S/, { message: "First name cannot be blank." })
  firstName!: string;

  @IsString()
  @Length(1, 80)
  @Matches(/\S/, { message: "Last name cannot be blank." })
  lastName!: string;

  @IsIn(["COLLECTOR", "ARTIST"])
  accountIntent!: "COLLECTOR" | "ARTIST";

  @IsBoolean()
  acceptedTerms!: boolean;

  @IsBoolean()
  acceptedPrivacyPolicy!: boolean;

  @IsOptional()
  @IsBoolean()
  marketingOptIn?: boolean;
}
