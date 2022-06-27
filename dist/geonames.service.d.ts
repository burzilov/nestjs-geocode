import { HttpService } from '@nestjs/axios';
import { Address, Options } from './interfaces';
export declare class GeonamesService {
    private o;
    private http;
    private configured;
    private countryName;
    constructor(o: Options, http: HttpService);
    private search;
    countries(): any;
    zip(query: string, limit?: number): import("rxjs").Observable<Address[]>;
    city(query: string, limit?: number): import("rxjs").Observable<Address[]>;
}
