import * as express from 'express';
import { inject } from 'inversify';
import { interfaces, controller, httpGet, response, queryParam } from 'inversify-express-utils';
import ServicesTypes from '../services/types';
import { ZipCodeService } from '../services/zipCode.service';
import { assertDateRangeInStringDateFormatForMonth } from '../utils/assert.utils';
import { privateWithCors } from '../middleware/controller.middleware';

@controller('/zip-code', ...privateWithCors)
export class ZipCodeController implements interfaces.Controller {
  constructor (@inject(ServicesTypes.ZipCodeService) private zipCodeService: ZipCodeService) {

  }

  @httpGet('/paystats-amount')
  public async getTotalByDateRange (
    @response() res: express.Response,
    @queryParam('startMonth') start: string,
    @queryParam('endMonth') end: string) {
    assertDateRangeInStringDateFormatForMonth(start, end);
    const startDate = new Date(start);
    const endDate = new Date(end);
    const total = await this.zipCodeService.getAllWithPaystatsAmountInDateRange(startDate, endDate);
    res.status(200).json(total);
  }
}
