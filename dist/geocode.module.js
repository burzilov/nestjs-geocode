"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GeocodeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeocodeModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const geonames_service_1 = require("./geonames.service");
const google_service_1 = require("./google.service");
const interfaces_1 = require("./interfaces");
let GeocodeModule = GeocodeModule_1 = class GeocodeModule {
    static forRoot(options) {
        return {
            module: GeocodeModule_1,
            exports: [google_service_1.GoogleService, geonames_service_1.GeonamesService],
            providers: [{ provide: interfaces_1.OPTIONS, useValue: options }],
        };
    }
};
GeocodeModule = GeocodeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [google_service_1.GoogleService, geonames_service_1.GeonamesService],
    })
], GeocodeModule);
exports.GeocodeModule = GeocodeModule;
//# sourceMappingURL=geocode.module.js.map