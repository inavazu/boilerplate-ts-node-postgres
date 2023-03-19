import { injectable } from 'inversify';
import { databasePool } from '../index';
import { logError } from '../utils/error.utils';

@injectable()
export class PostgresConnector {
  public async runQuery<T, I> (type: { new(e: I): T ;}, query: string, values?: any[]): Promise<T[]> {
    try {
      const result = await databasePool.query(query, values);
      const rows = result.rows;
      if (rows && rows.length > 0) {
        // eslint-disable-next-line new-cap
        return rows.map(row => new type(row as I));
      }
    } catch (error) {
      logError('Cannot execute query', error);
      throw error;
    }
    return [];
  }
}
