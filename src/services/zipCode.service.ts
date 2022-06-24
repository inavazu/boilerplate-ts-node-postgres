import { inject, injectable } from 'inversify';
import { PostalCodePaystats } from 'src/model/postalCodePaystats.model';
import RepositoryTypes from 'src/repositories/types';
import { ZipCodeRepository } from 'src/repositories/zipCode.repository';

@injectable()
export class ZipCodeService {
  constructor (@inject(RepositoryTypes.ZipCodeRepository) private zipCodeRepository: ZipCodeRepository) {

  }

  public async getAllWithPaystatsAmountInDateRange (start: Date, end: Date): Promise<PostalCodePaystats[]> {
    const total = await this.zipCodeRepository.getAllWithPaystatsAmountInDateRange(start, end);
    return total;
  }
}
