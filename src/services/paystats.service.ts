import { injectable } from 'inversify';

@injectable()
export class PaystatsService {
  public async getTotal () {
    console.log('Service -> getTotal()');
  }
}
