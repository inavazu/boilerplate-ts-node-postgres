import { Paystats } from '../model/paystat.model';
import { AccumulatedAgeGenderDTO } from './accumulatedAgeGender.dto';

export class AccumulatedAgeGenderMonthDTO extends AccumulatedAgeGenderDTO {
  month: Date;

  constructor (paystats: Paystats) {
    super(paystats);
    this.month = paystats.month;
  }

  public static convertFromPaystatsArray (paystats: Paystats[]): AccumulatedAgeGenderMonthDTO[] {
    return paystats.map(e => new AccumulatedAgeGenderMonthDTO(e));
  }
}
