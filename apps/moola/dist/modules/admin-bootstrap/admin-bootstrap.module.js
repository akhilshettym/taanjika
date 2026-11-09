"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBootstrapModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const firebase_module_1 = require("../firebase/firebase.module");
const users_module_1 = require("../users/users.module");
const admin_bootstrap_service_1 = require("./admin-bootstrap.service");
let AdminBootstrapModule = class AdminBootstrapModule {
};
exports.AdminBootstrapModule = AdminBootstrapModule;
exports.AdminBootstrapModule = AdminBootstrapModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, firebase_module_1.FirebaseModule, users_module_1.UsersModule],
        providers: [admin_bootstrap_service_1.AdminBootstrapService],
    })
], AdminBootstrapModule);
//# sourceMappingURL=admin-bootstrap.module.js.map