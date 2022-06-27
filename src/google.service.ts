import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Options, OPTIONS } from './interfaces';

@Injectable()
export class GoogleService {
  private configured = false;

  constructor(@Inject(OPTIONS) private o: Options, private http: HttpService) {
    if (this.o.geonames_username) {
      this.configured = true;
    }
  }

  ping() {
    return 'pong';
  }
}
