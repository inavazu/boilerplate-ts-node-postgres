import 'reflect-metadata';
import { ZipCodeRepository } from '../../repositories/zipCode.repository';
import { ZipCodeService } from '../zipCode.service';

describe('PaystatsService', () => {
  const zipCodeRepository: ZipCodeRepository = {
    getAllWithPaystatsAmountInDateRange: jest.fn()
  } as any as ZipCodeRepository;
  const zipCodeService = new ZipCodeService(zipCodeRepository);

  describe('getTotalByDateRange', () => {
    it('expected call to paystatRepository.getTotalInDateRange to be done', async () => {
      await zipCodeService.getAllWithPaystatsAmountInDateRange(new Date(), new Date());

      expect(zipCodeRepository.getAllWithPaystatsAmountInDateRange).toHaveBeenCalledTimes(1);
    });
  });
});
