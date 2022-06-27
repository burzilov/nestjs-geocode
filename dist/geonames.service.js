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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeonamesService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const interfaces_1 = require("./interfaces");
let GeonamesService = class GeonamesService {
    constructor(o, http) {
        this.o = o;
        this.http = http;
        this.configured = false;
        this.countryName = {};
        if (this.o.geonames_username) {
            this.configured = true;
        }
        if (this.configured) {
            this.http
                .get(`http://api.geonames.org/countryInfoJSON?username=${this.o.geonames_username}`)
                .pipe((0, rxjs_1.catchError)((err) => {
                var _a;
                throw new Error(`Error of api.geonames.org request: ${((_a = err.response.data.status) === null || _a === void 0 ? void 0 : _a.message) || err.response.statusText}`);
            }))
                .subscribe({
                next: (resp) => {
                    resp.data.geonames.forEach((x) => {
                        this.countryName[x.countryCode] = x.countryName;
                    });
                },
            });
        }
    }
    search(searchType, query, limit) {
        if (!this.configured) {
            throw new Error(`geonames_username not configured`);
        }
        const url = `http://api.geonames.org/postalCodeLookupJSON?username=${this.o.geonames_username}` +
            `&maxRows=${limit}&${searchType}=${encodeURIComponent(query)}`;
        return !query
            ? (0, rxjs_1.of)([])
            : this.http.get(url).pipe((0, rxjs_1.map)((resp) => {
                var _a, _b;
                const data = (_b = (_a = resp.data) === null || _a === void 0 ? void 0 : _a.postalcodes) === null || _b === void 0 ? void 0 : _b.map((x) => {
                    const address = {
                        suggestion: [this.countryName[x.countryCode], x.postalcode, x.placeName].join(', '),
                        iso: x.countryCode,
                        country: this.countryName[x.countryCode],
                        zip: x.postalcode,
                        city: x.placeName,
                    };
                    return address;
                }).sort((a, b) => {
                    return a.suggestion > b.suggestion ? 1 : -1;
                });
                return data;
            }));
    }
    countries() {
        return this.countryName;
    }
    zip(query, limit = 50) {
        return this.search('postalcode', query, limit);
    }
    city(query, limit = 50) {
        return this.search('placename', query, limit);
    }
};
GeonamesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.OPTIONS)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], GeonamesService);
exports.GeonamesService = GeonamesService;
//# sourceMappingURL=geonames.service.js.map