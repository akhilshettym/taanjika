export declare const ROLES_KEY = "taanjika:required-roles";
export type AppRole = "CUSTOMER" | "ARTIST" | "ADMIN";
export declare const Roles: (...roles: AppRole[]) => import("@nestjs/common", { with: { "resolution-mode": "import" } }).CustomDecorator<string>;
