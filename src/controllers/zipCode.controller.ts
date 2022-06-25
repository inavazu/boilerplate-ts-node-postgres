import * as express from 'express';
import { inject } from 'inversify';
import { interfaces, controller, httpGet, request, response, queryParam } from 'inversify-express-utils';
import ServicesTypes from '../services/types';
import { ZipCodeService } from '../services/zipCode.service';
import { assertStringDateFormatForMonth } from '../utils/assert.utils';

@controller('/zip-code')
export class ZipCodeController implements interfaces.Controller {
  constructor (@inject(ServicesTypes.ZipCodeService) private zipCodeService: ZipCodeService) {

  }

  @httpGet('/paystats-amount')
  public async getTotalByDateRange (
    @request() req: express.Request,
    @response() res: express.Response,
    @queryParam('startMonth') start: string,
    @queryParam('endMonth') end: string) {
    console.log('req', req);
    assertStringDateFormatForMonth(start);
    assertStringDateFormatForMonth(end);
    const startDate = new Date(start);
    const endDate = new Date(end);
    const total = await this.zipCodeService.getAllWithPaystatsAmountInDateRange(startDate, endDate);
    res.status(200).json(total);
  }
}
