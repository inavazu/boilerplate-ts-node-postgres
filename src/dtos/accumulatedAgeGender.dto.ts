import { Paystats } from '../model/paystat.model';

export class AccumulatedAgeGenderDTO {
  ageRange: string;
  amount: number;
  gender: string;

  constructor (paystats: Paystats) {
    this.ageRange = paystats.ageRange;
    this.amount = paystats.amount;
    this.gender = paystats.gender;
  }

  public static convertFromPaystatsArray (paystats: Paystats[]): AccumulatedAgeGenderDTO[] {
    return paystats.map(e => new AccumulatedAgeGenderDTO(e));
  }
}
