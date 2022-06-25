import dotenv from 'dotenv';

// TODO: .env configration needs a refactor so it only loads dotenv lib when we are on testing mode so there is no need to copy the .env file
export interface EnvironmentVariablesSchema {
    host: string;
    port: string;
}

const isTestEnv = () => {
  const env = process.env.NODE_ENV;
  return env === 'test';
};

const getEnvFile = () => {
  return isTestEnv() ? '.env.test' : '.env';
};

const envFound = dotenv.config({ path: getEnvFile() });

if (envFound.error) {
  throw Error(`Cannot initialize environmental variablesCould not find file: ${getEnvFile()}`);
}

export const EnvironmentVariables: EnvironmentVariablesSchema = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || '5000'
};
