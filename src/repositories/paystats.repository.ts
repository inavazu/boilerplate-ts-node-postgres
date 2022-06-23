import { injectable } from 'inversify';
import { PostalCode, PostalCodeSchema } from 'src/model/postalCode.model';
import { PostgresConnector } from './postgres';

@injectable()
export class PaystatsRepository extends PostgresConnector {
  public async getTotal (): Promise<PostalCode[]> {
    console.log('PaystatsRepository -> getTotal()');

    return this.runQuery<PostalCode, PostalCodeSchema>(PostalCode, 'select id as id, code as code, the_geom as theGeom from postal_codes');
  }
}
