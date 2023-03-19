import ServicesTypes from '../services/types';
import { Container } from 'inversify';
import { PaystatsService } from '../services/paystats.service';
import { PaystatsRepository } from '../repositories/paystats.repository';
import RepositoryTypes from '../repositories/types';
import { ZipCodeRepository } from '../repositories/zipCode.repository';
import { ZipCodeService } from '../services/zipCode.service';

const container = new Container();

container.bind<PaystatsService>(ServicesTypes.PaystatsService).to(PaystatsService).inSingletonScope();
container.bind<PaystatsRepository>(RepositoryTypes.PaystatsRepository).to(PaystatsRepository).inSingletonScope();

container.bind<ZipCodeService>(ServicesTypes.ZipCodeService).to(ZipCodeService).inSingletonScope();
container.bind<ZipCodeRepository>(RepositoryTypes.ZipCodeRepository).to(ZipCodeRepository).inSingletonScope();

export default container;
