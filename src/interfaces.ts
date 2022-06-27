export const OPTIONS = 'OPTIONS';

export interface Options {
  google_api_key?: string;
  geonames_username?: string;
}

export interface Address {
  suggestion: string;
  iso: string;
  country: string;
  zip: string;
  city: string;
  street?: string;
  house?: string;
}

export interface GeonamesCountry {
  areaInSqKm: string;
  capital: string;
  continent: string;
  continentName: string;
  countryCode: string;
  countryName: string;
  currencyCode: string;
  east: number;
  fipsCode: string;
  geonameId: number;
  isoAlpha3: string;
  isoNumeric: string;
  languages: string;
  north: number;
  population: string;
  postalCodeFormat: string;
  south: number;
  west: number;
}

export interface GeonamesPostalCode {
  adminCode1: string;
  adminName1: string;
  adminName2: string;
  countryCode: string;
  lat: number;
  lng: number;
  placeName: string;
  postalcode: string;
}
