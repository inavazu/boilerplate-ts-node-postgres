import { injectable } from 'inversify';
import { PostalCodePaystats, PostalCodePaystatsSchema } from '../model/postalCodePaystats.model';
import { getDateFormatted } from '../utils/dates.utils';
import { PostgresConnector } from './postgres';

@injectable()
export class ZipCodeRepository extends PostgresConnector {
  public async getAllWithPaystatsAmountInDateRange (start: Date, end: Date): Promise<PostalCodePaystats[]> {
    const startFormatted = getDateFormatted(start);
    const endFormatted = getDateFormatted(end);
    const query = `select pc.id, sum(p.amount), pc.the_geom from postal_codes pc left join paystats p on pc.id = p.postal_code_id where p.p_month >= '${startFormatted}' and p.p_month <= '${endFormatted}' group by pc.id`;

    const result = await this.runQuery<PostalCodePaystats, PostalCodePaystatsSchema>(PostalCodePaystats, query);

    return result;
  }
}
