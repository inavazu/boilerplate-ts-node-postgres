export interface PaystatsSchema {
    id: number;
    postal_code_id: number;
    p_month: Date;
    p_age: string;
    p_gender: string;
    amount: number;
    sum?: number;
}

export class Paystats {
  id: number;
  postalCodeId: number;
  month: Date;
  ageRange: string;
  gender: string;
  amount: number;

  constructor (paystatsSchema: PaystatsSchema) {
    this.id = paystatsSchema.id ?? null;
    this.postalCodeId = paystatsSchema.postal_code_id ?? null;
    this.month = paystatsSchema.p_month ? new Date(paystatsSchema.p_month) : null;
    this.ageRange = paystatsSchema.p_age ?? null;
    this.gender = paystatsSchema.p_gender ?? null;
    this.amount = Number(paystatsSchema.sum ?? paystatsSchema.amount) ?? null;
  }
}
