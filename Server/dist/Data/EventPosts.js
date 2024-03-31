"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPosts = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Societies_1 = require("./Societies");
let EventPosts = class EventPosts extends typeorm_1.BaseEntity {
};
exports.EventPosts = EventPosts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment")
], EventPosts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 512 })
], EventPosts.prototype, "eventPost", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 64 })
], EventPosts.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { default: () => "CURRENT_TIMESTAMP" })
], EventPosts.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 32 })
], EventPosts.prototype, "eventTime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 32 })
], EventPosts.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Societies_1.Societies, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], EventPosts.prototype, "societyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], EventPosts.prototype, "userId", void 0);
exports.EventPosts = EventPosts = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "event_posts" })
], EventPosts);
