import * as express from 'express';
import { inject } from 'inversify';
import { interfaces, controller, httpGet, request, response } from 'inversify-express-utils';
import TYPES from 'src/services/types';
import { PaystatsService } from '../services/paystats.service';

@controller('/paystats')
export class PaystatsController implements interfaces.Controller {
  constructor (@inject(TYPES.PaystatsService) private paystatsService: PaystatsService) {

  }

  @httpGet('/total')
  public async index (@request() req: express.Request, @response() res: express.Response) {
    try {
      console.log('req', req);
      const posts = await this.paystatsService.getTotal();
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
