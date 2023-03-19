import { inject, injectable } from 'inversify';
import { ZipCodeAccumulatedDTO } from '../dtos/zipCodesAccumulated.dto';
import RepositoryTypes from '../repositories/types';
import { ZipCodeRepository } from '../repositories/zipCode.repository';

@injectable()
export class ZipCodeService {
  constructor (@inject(RepositoryTypes.ZipCodeRepository) private zipCodeRepository: ZipCodeRepository) {

  }

  public async getAllWithPaystatsAmountInDateRange (start: Date, end: Date): Promise<ZipCodeAccumulatedDTO[]> {
    const data = await this.zipCodeRepository.getAllWithPaystatsAmountInDateRange(start, end);
    const zipCodeAccumulatedDTO: ZipCodeAccumulatedDTO[] = ZipCodeAccumulatedDTO.convertFromPostalCodePaystatsArray(data);
    return zipCodeAccumulatedDTO;
  }
}
