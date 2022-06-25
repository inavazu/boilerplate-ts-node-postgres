import { inject, injectable } from 'inversify';
import { Paystats } from '../model/paystat.model';
import { PaystatsRepository } from '../repositories/paystats.repository';
import RepositoryTypes from '../repositories/types';

@injectable()
export class PaystatsService {
  constructor (@inject(RepositoryTypes.PaystatsRepository) private paystatsRepository: PaystatsRepository) {

  }

  public async getTotalByDateRange (start: Date, end: Date): Promise<number> {
    const total = await this.paystatsRepository.getTotalInDateRange(start, end);
    return total;
  }

  public async getAccumulatedByGenderAndAgeInDateRange (start: Date, end: Date): Promise<Paystats[]> {
    const data = await this.paystatsRepository.getAccumulatedByGenderAndAgeInDateRange(start, end);
    return data;
  }

  public async getAccumulatedByGenderAgeAndMonthInDateRange (start: Date, end: Date): Promise<Paystats[]> {
    const data = await this.paystatsRepository.getAccumulatedByGenderAgeAndMonthInDateRange(start, end);
    return data;
  }

  public async getDetailInDateRange (zipCode: number, start: Date, end: Date): Promise<Paystats[]> {
    const data = await this.paystatsRepository.getDetailInDateRange(zipCode, start, end);
    return data;
  }
}
