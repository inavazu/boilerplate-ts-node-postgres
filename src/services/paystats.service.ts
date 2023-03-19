import { inject, injectable } from 'inversify';
import { AccumulatedAgeGenderDTO } from '../dtos/accumulatedAgeGender.dto';
import { AccumulatedAgeGenderMonthDTO } from '../dtos/accumulatedAgeGenderMonth.dto';
import { TotalAccumulatedDTO } from '../dtos/totalAccumulated.dto';
import { PaystatsRepository } from '../repositories/paystats.repository';
import RepositoryTypes from '../repositories/types';

@injectable()
export class PaystatsService {
  constructor (@inject(RepositoryTypes.PaystatsRepository) private paystatsRepository: PaystatsRepository) {

  }

  public async getTotalByDateRange (start: Date, end: Date): Promise<TotalAccumulatedDTO> {
    const total = await this.paystatsRepository.getTotalInDateRange(start, end);
    const totalAccumulatedDTO: TotalAccumulatedDTO = new TotalAccumulatedDTO(total);
    return totalAccumulatedDTO;
  }

  public async getAccumulatedByGenderAndAgeInDateRange (start: Date, end: Date): Promise<AccumulatedAgeGenderDTO[]> {
    const data = await this.paystatsRepository.getAccumulatedByGenderAndAgeInDateRange(start, end);
    const accumulatedAgeGenderDTO: AccumulatedAgeGenderDTO[] = AccumulatedAgeGenderDTO.convertFromPaystatsArray(data);
    return accumulatedAgeGenderDTO;
  }

  public async getAccumulatedByGenderAgeAndMonthInDateRange (start: Date, end: Date): Promise<AccumulatedAgeGenderMonthDTO[]> {
    const data = await this.paystatsRepository.getAccumulatedByGenderAgeAndMonthInDateRange(start, end);
    const accumulatedAgeGenderMonthDTO: AccumulatedAgeGenderMonthDTO[] = AccumulatedAgeGenderMonthDTO.convertFromPaystatsArray(data);
    return accumulatedAgeGenderMonthDTO;
  }

  public async getDetailInDateRange (zipCode: number, start: Date, end: Date): Promise<AccumulatedAgeGenderDTO[]> {
    const data = await this.paystatsRepository.getDetailInDateRange(zipCode, start, end);
    const accumulatedAgeGenderDTO: AccumulatedAgeGenderDTO[] = AccumulatedAgeGenderDTO.convertFromPaystatsArray(data);
    return accumulatedAgeGenderDTO;
  }
}
