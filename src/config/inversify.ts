import TYPES from '../services/types';
import { Container } from 'inversify';
import { PaystatsService } from '../services/paystats.service';

const container = new Container();

container.bind<PaystatsService>(TYPES.PaystatsService).to(PaystatsService).inSingletonScope();

export default container;
