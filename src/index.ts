import 'reflect-metadata';
import { createServer } from './config/express';
import { AddressInfo } from 'net';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './config/inversify';
import { EnvironmentVariables } from './config/environment';
import './controllers/index';
import { Pool } from 'pg';

const stratServer = async () => {
  const app = createServer();
  const host = EnvironmentVariables.host;
  const port = EnvironmentVariables.port;
  const appConfigured = new InversifyExpressServer(container, null, { rootPath: '/api' }, app).build();
  const server = appConfigured.listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(`\n Server ready at http://${addressInfo.address}:${addressInfo.port}`);
  });

  // eslint-disable-next-line no-undef
  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      console.log(`Microservice closing nicely after recognizing signal ${type}`);
      server.close(async () => {
        console.log('   Closing any database connection leftover');
        await databasePool.end();
        console.log('   Closed database connections');
        console.log('Microservice closed');
      });
    });
  });
};

export const databasePool = new Pool({
  user: 'postgres',
  password: 'mypassword',
  host: '0.0.0.0',
  port: 5432,
  database: 'carto',
  ssl: false
});

stratServer();
