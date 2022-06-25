import { inject, injectable } from 'inversify';
import { PostalCodePaystats } from '../model/postalCodePaystats.model';
import RepositoryTypes from '../repositories/types';
import { ZipCodeRepository } from '../repositories/zipCode.repository';

@injectable()
export class ZipCodeService {
  constructor (@inject(RepositoryTypes.ZipCodeRepository) private zipCodeRepository: ZipCodeRepository) {

  }

  public async getAllWithPaystatsAmountInDateRange (start: Date, end: Date): Promise<PostalCodePaystats[]> {
    const total = await this.zipCodeRepository.getAllWithPaystatsAmountInDateRange(start, end);
    return total;
  }
}
