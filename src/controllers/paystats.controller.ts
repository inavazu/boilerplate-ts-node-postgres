import * as express from 'express';
import { inject } from 'inversify';
import { interfaces, controller, httpGet, response, queryParam, requestParam } from 'inversify-express-utils';
import ServicesTypes from '../services/types';
import { assertStringDateFormatForMonth, assertZipCodeForMadrid } from '../utils/assert.utils';
import { PaystatsService } from '../services/paystats.service';
import { authMiddleware } from '../middleware/auth.middleware';
import cors from 'cors';
import { corsOptionsDelegate } from '../middleware/corsHandler';

@controller('/paystats', ...[cors(corsOptionsDelegate), authMiddleware])
export class PaystatsController implements interfaces.Controller {
  constructor (@inject(ServicesTypes.PaystatsService) private paystatsService: PaystatsService) {

  }

  @httpGet('/total')
  public async getTotalByDateRange (
    @response() res: express.Response,
    @queryParam('startMonth') start: string,
    @queryParam('endMonth') end: string) {
    assertStringDateFormatForMonth(start);
    assertStringDateFormatForMonth(end);

    const startDate = new Date(start);
    const endDate = new Date(end);
    const total = await this.paystatsService.getTotalByDateRange(startDate, endDate);

    res.status(200).json(total);
  }

  @httpGet('/accumulated/age-gender')
  public async getAccumulatedByGenderAndAgeInDateRange (
    @response() res: express.Response,
    @queryParam('startMonth') start: string,
    @queryParam('endMonth') end: string) {
    assertStringDateFormatForMonth(start);
    assertStringDateFormatForMonth(end);

    const startDate = new Date(start);
    const endDate = new Date(end);
    const data = await this.paystatsService.getAccumulatedByGenderAndAgeInDateRange(startDate, endDate);

    res.status(200).json(data);
  }

  @httpGet('/accumulated/age-gender-month')
  public async getAccumulatedByGenderAgeAndMonthInDateRange (
    @response() res: express.Response,
    @queryParam('startMonth') start: string,
    @queryParam('endMonth') end: string) {
    assertStringDateFormatForMonth(start);
    assertStringDateFormatForMonth(end);

    const startDate = new Date(start);
    const endDate = new Date(end);
    const data = await this.paystatsService.getAccumulatedByGenderAgeAndMonthInDateRange(startDate, endDate);

    res.status(200).json(data);
  }

  @httpGet('/zip-code/:id')
  public async getDetailInDateRange (
    @response() res: express.Response,
    @requestParam('id') zipCode: number,
    @queryParam('startMonth') start: string,
    @queryParam('endMonth') end: string) {
    assertZipCodeForMadrid(zipCode);
    assertStringDateFormatForMonth(start);
    assertStringDateFormatForMonth(end);

    const startDate = new Date(start);
    const endDate = new Date(end);
    const data = await this.paystatsService.getDetailInDateRange(zipCode, startDate, endDate);

    res.status(200).json(data);
  }
}
