export declare class RegisterProfileDto {
    firstName: string;
    lastName: string;
    accountIntent: "COLLECTOR" | "ARTIST";
    acceptedTerms: boolean;
    acceptedPrivacyPolicy: boolean;
    marketingOptIn?: boolean;
}
