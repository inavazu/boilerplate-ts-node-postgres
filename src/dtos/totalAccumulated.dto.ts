import { Sum } from '../model/sum.model';

export class TotalAccumulatedDTO {
  amount: number;

  constructor (sum: Sum) {
    this.amount = sum.sum;
  }
}
