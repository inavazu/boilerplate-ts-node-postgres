import { inject, injectable } from 'inversify';
import { PostalCode } from 'src/model/postalCode.model';
import { PaystatsRepository } from 'src/repositories/paystats.repository';
import RepositoryTypes from 'src/repositories/types';

@injectable()
export class PaystatsService {
  constructor (@inject(RepositoryTypes.PaystatsRepository) private paystatsRepository: PaystatsRepository) {

  }

  public async getTotal (): Promise<PostalCode[]> {
    console.log('Service -> getTotal()');
    const postalCodes = await this.paystatsRepository.getTotal();
    return postalCodes;
  }
}
