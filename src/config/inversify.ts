import ServicesTypes from '../services/types';
import { Container } from 'inversify';
import { PaystatsService } from '../services/paystats.service';
import { PaystatsRepository } from 'src/repositories/paystats.repository';
import RepositoryTypes from 'src/repositories/types';

const container = new Container();

container.bind<PaystatsService>(ServicesTypes.PaystatsService).to(PaystatsService).inSingletonScope();
container.bind<PaystatsRepository>(RepositoryTypes.PaystatsRepository).to(PaystatsRepository).inSingletonScope();

export default container;
