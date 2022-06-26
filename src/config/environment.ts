export interface EnvironmentVariablesSchema {
    host: string;
    port: string;
    dbUser: string,
    dbPassword: string,
    dbHost: string,
    dbPort: number,
    dbDatabase: string,
    dbSsl: boolean
    sessionTokenSecret: string;
}

const isTestEnv = () => {
  const env = process.env.NODE_ENV;
  return env === 'test';
};

const isProdEnv = () => {
  const env = process.env.NODE_ENV;
  return env === 'production';
};

const getEnvFile = () => {
  return isTestEnv() ? '.env.test' : '.env';
};

if (!isProdEnv()) {
  console.log(`Loading .env file as we are not in a production envrionment. Current environment is ${process.env.NODE_ENV}`);
  const dotenv = require('dotenv');
  const envFound = dotenv.config({ path: getEnvFile() });

  if (envFound.error) {
    throw Error(`Cannot initialize environmental variablesCould not find file: ${getEnvFile()}`);
  }
}

export const EnvironmentVariables: EnvironmentVariablesSchema = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || '5001',
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'mypassword',
  dbHost: process.env.DB_HOST || '0.0.0.0',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbDatabase: process.env.DB_DATABASE || 'carto2',
  dbSsl: Boolean(Number(process.env.DB_SSL)) || false,
  sessionTokenSecret: process.env.SESSION_TOKEN_SECRET || 'cartoSecret'
};
