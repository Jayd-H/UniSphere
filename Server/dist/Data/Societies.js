"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Societies = void 0;
const typeorm_1 = require("typeorm");
let Societies = class Societies extends typeorm_1.BaseEntity {
};
exports.Societies = Societies;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment")
], Societies.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 32 })
], Societies.prototype, "societyName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 256 })
], Societies.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("mediumblob")
], Societies.prototype, "bannerImg", void 0);
exports.Societies = Societies = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "societies" })
], Societies);
