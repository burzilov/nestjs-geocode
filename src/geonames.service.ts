import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { catchError, map, of } from 'rxjs';
import { Address, GeonamesCountry, Options, OPTIONS } from './interfaces';
import { AxiosError } from 'axios';

@Injectable()
export class GeonamesService {
  private configured = false;
  private countryName: any = {};

  constructor(@Inject(OPTIONS) private o: Options, private http: HttpService) {
    if (this.o.geonames_username) {
      this.configured = true;
    }
    if (this.configured) {
      this.http
        .get<{ geonames: GeonamesCountry[] }>(
          `http://api.geonames.org/countryInfoJSON?username=${this.o.geonames_username}`
        )
        .pipe(
          catchError((err: AxiosError) => {
            throw new Error(
              `Error of api.geonames.org request: ${
                (err.response.data as any).status?.message || err.response.statusText
              }`
            );
          })
        )
        .subscribe({
          next: (resp) => {
            resp.data.geonames.forEach((x) => {
              this.countryName[x.countryCode] = x.countryName;
            });
          },
        });
    }
  }

  private search(searchType: string, query: string, limit: number) {
    if (!this.configured) {
      throw new Error(`geonames_username not configured`);
    }
    const url =
      `http://api.geonames.org/postalCodeLookupJSON?username=${this.o.geonames_username}` +
      `&maxRows=${limit}&${searchType}=${encodeURIComponent(query)}`;
    return !query
      ? of([] as Address[])
      : this.http.get(url).pipe(
          map((resp: any) => {
            const data: Address[] = resp.data?.postalcodes
              ?.map((x: any) => {
                const address: Address = {
                  suggestion: [this.countryName[x.countryCode], x.postalcode, x.placeName].join(', '),
                  iso: x.countryCode,
                  country: this.countryName[x.countryCode],
                  zip: x.postalcode,
                  city: x.placeName,
                };
                return address;
              })
              .sort((a: any, b: any) => {
                return a.suggestion > b.suggestion ? 1 : -1;
              });
            return data;
          })
        );
  }

  // PUBLIC

  countries() {
    return this.countryName;
  }

  zip(query: string, limit = 50) {
    // search country and city by postal code
    return this.search('postalcode', query, limit);
  }

  city(query: string, limit = 50) {
    // search country and postal code by city
    return this.search('placename', query, limit);
  }
}
