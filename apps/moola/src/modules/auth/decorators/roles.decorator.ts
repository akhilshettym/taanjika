import { SetMetadata } from "@nestjs/common";
export const ROLES_KEY = "taanjika:required-roles";
export type AppRole = "CUSTOMER" | "ARTIST" | "ADMIN";
export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);
