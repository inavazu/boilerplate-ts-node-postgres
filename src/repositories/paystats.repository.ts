import { injectable } from 'inversify';

@injectable()
export class PaystatsRepository {
  public async getTotal () {
    console.log('PaystatsRepository -> getTotal()');
  }
}
