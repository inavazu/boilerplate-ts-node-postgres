import { inject, injectable } from 'inversify';
import { PaystatsRepository } from 'src/repositories/paystats.repository';
import RepositoryTypes from 'src/repositories/types';

@injectable()
export class PaystatsService {
  constructor (@inject(RepositoryTypes.PaystatsRepository) private paystatsRepository: PaystatsRepository) {

  }

  public async getTotal () {
    console.log('Service -> getTotal()');
    this.paystatsRepository.getTotal();
  }
}
