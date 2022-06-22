import 'dotenv/config';
import { createServer } from './config/express';
import http from 'http';
import { AddressInfo } from 'net';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';

const stratServer = async () => {
  const app = createServer();
  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(`\n Server ready at http://${addressInfo.address}:${addressInfo.port}`);
  });
};

stratServer();
