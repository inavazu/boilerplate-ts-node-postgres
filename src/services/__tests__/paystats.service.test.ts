import 'reflect-metadata';
import { Sum } from '../../model/sum.model';
import { mocksPaystats } from '../../../mocks/paystats.mocks';
import { PaystatsRepository } from '../../repositories/paystats.repository';
import { PaystatsService } from '../paystats.service';

describe('PaystatsService', () => {
  const paystatRepository: PaystatsRepository = {
    getTotalInDateRange: jest.fn().mockReturnValue(new Sum({ sum: 23423.234 })),
    getAccumulatedByGenderAndAgeInDateRange: jest.fn().mockReturnValue(mocksPaystats),
    getAccumulatedByGenderAgeAndMonthInDateRange: jest.fn().mockReturnValue(mocksPaystats),
    getDetailInDateRange: jest.fn().mockReturnValue(mocksPaystats)
  } as any as PaystatsRepository;
  const paystatsService = new PaystatsService(paystatRepository);

  describe('getTotalByDateRange', () => {
    it('expected call to paystatRepository.getTotalInDateRange to be done', async () => {
      await paystatsService.getTotalByDateRange(new Date(), new Date());

      expect(paystatRepository.getTotalInDateRange).toHaveBeenCalledTimes(1);
    });
  });
  describe('getAccumulatedByGenderAndAgeInDateRange', () => {
    it('expected call to paystatRepository.getAccumulatedByGenderAndAgeInDateRange to be done', async () => {
      await paystatsService.getAccumulatedByGenderAndAgeInDateRange(new Date(), new Date());

      expect(paystatRepository.getAccumulatedByGenderAndAgeInDateRange).toHaveBeenCalledTimes(1);
    });
  });
  describe('getAccumulatedByGenderAgeAndMonthInDateRange', () => {
    it('expected call to paystatRepository.getAccumulatedByGenderAgeAndMonthInDateRange to be done', async () => {
      await paystatsService.getAccumulatedByGenderAgeAndMonthInDateRange(new Date(), new Date());

      expect(paystatRepository.getAccumulatedByGenderAgeAndMonthInDateRange).toHaveBeenCalledTimes(1);
    });
  });
  describe('getDetailInDateRange', () => {
    it('expected call to paystatRepository.getDetailInDateRange to be done', async () => {
      await paystatsService.getDetailInDateRange(28514, new Date(), new Date());

      expect(paystatRepository.getDetailInDateRange).toHaveBeenCalledTimes(1);
    });
  });
});
