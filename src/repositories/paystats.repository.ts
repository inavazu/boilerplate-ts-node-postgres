import { injectable } from 'inversify';
import { Paystats, PaystatsSchema } from '../model/paystat.model';
import { Sum, SumSchema } from '../model/sum.model';
import { getDateFormatted } from '../utils/dates.utils';
import { PostgresConnector } from './postgres';

@injectable()
export class PaystatsRepository extends PostgresConnector {
  public async getTotalInDateRange (start: Date, end: Date): Promise<Sum> {
    const startFormatted = getDateFormatted(start);
    const endFormatted = getDateFormatted(end);
    const query = `select sum(amount) from paystats where p_month >= '${startFormatted}' and p_month <= '${endFormatted}'`;

    const result = await this.runQuery<Sum, SumSchema>(Sum, query);

    return result[0];
  }

  public async getAccumulatedByGenderAndAgeInDateRange (start: Date, end: Date): Promise<Paystats[]> {
    const startFormatted = getDateFormatted(start);
    const endFormatted = getDateFormatted(end);
    const query = `select sum(amount), p_age, p_gender from paystats where p_month >= '${startFormatted}' and p_month <= '${endFormatted}' group by p_age, p_gender`;

    const result = await this.runQuery<Paystats, PaystatsSchema>(Paystats, query);

    return result;
  }

  public async getAccumulatedByGenderAgeAndMonthInDateRange (start: Date, end: Date): Promise<Paystats[]> {
    const startFormatted = getDateFormatted(start);
    const endFormatted = getDateFormatted(end);
    const query = `select sum(amount), p_age, p_gender, p_month from paystats where p_month >= '${startFormatted}' and p_month <= '${endFormatted}' group by p_age, p_gender, p_month`;

    const result = await this.runQuery<Paystats, PaystatsSchema>(Paystats, query);

    return result;
  }

  public async getDetailInDateRange (zipCode: number, start: Date, end: Date): Promise<Paystats[]> {
    const startFormatted = getDateFormatted(start);
    const endFormatted = getDateFormatted(end);
    const query = `select sum(p.amount), p.p_age, p.p_gender from postal_codes pc left join paystats p on pc.id = p.postal_code_id where pc.code = ${zipCode} and p.p_month >= '${startFormatted}' and p.p_month <= '${endFormatted}' group by p.p_age, p.p_gender order by p.p_age, p.p_gender`;

    const result = await this.runQuery<Paystats, PaystatsSchema>(Paystats, query);

    return result;
  }
}
