import { PostalCodePaystats } from '../model/postalCodePaystats.model';

export class ZipCodeAccumulatedDTO {
  zipCode: string;
  amount: number;
  geometry: string;

  constructor (postalCodePaystats: PostalCodePaystats) {
    this.zipCode = postalCodePaystats.code;
    this.amount = postalCodePaystats.amount;
    this.geometry = postalCodePaystats.theGeom;
  }

  public static convertFromPostalCodePaystatsArray (postalCodePaystats: PostalCodePaystats[]): ZipCodeAccumulatedDTO[] {
    return postalCodePaystats.map(e => new ZipCodeAccumulatedDTO(e));
  }
}
