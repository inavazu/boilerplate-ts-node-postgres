import { PaystatsSchema } from './paystat.model';
import { PostalCodeSchema } from './postalCode.model';

export interface PostalCodePaystatsSchema extends PostalCodeSchema, PaystatsSchema {

};

export class PostalCodePaystats {
  id: number;
  code: string;
  theGeom: string;
  postalCodeId: number;
  month: Date;
  ageRange: string;
  gender: string;
  amount: number;
  sum?: number;

  constructor (postalCodePaystatsSchema: PostalCodePaystatsSchema) {
    this.id = postalCodePaystatsSchema.id;
    this.code = postalCodePaystatsSchema.code;
    this.theGeom = postalCodePaystatsSchema.the_geom.toString();
    this.id = postalCodePaystatsSchema.id ?? null;
    this.postalCodeId = postalCodePaystatsSchema.postal_code_id ?? null;
    this.month = postalCodePaystatsSchema.p_month ? new Date(postalCodePaystatsSchema.p_month) : null;
    this.ageRange = postalCodePaystatsSchema.p_age ?? null;
    this.gender = postalCodePaystatsSchema.p_gender ?? null;
    this.amount = Number(postalCodePaystatsSchema.sum ?? postalCodePaystatsSchema.amount) ?? null;
  }
}
