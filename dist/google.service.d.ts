import { HttpService } from '@nestjs/axios';
import { Options } from './interfaces';
export declare class GoogleService {
    private o;
    private http;
    private configured;
    constructor(o: Options, http: HttpService);
    ping(): string;
}
