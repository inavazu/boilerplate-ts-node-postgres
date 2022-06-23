import 'reflect-metadata';
import 'dotenv/config';
import { createServer } from './config/express';
import { AddressInfo } from 'net';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './config/inversify';

import './controllers/index';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';

const stratServer = async () => {
  const app = createServer();
  const appConfigured = new InversifyExpressServer(container, null, { rootPath: '/api' }, app).build();
  const server = appConfigured.listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(`\n Server ready at http://${addressInfo.address}:${addressInfo.port}`);
  });
};

stratServer();
