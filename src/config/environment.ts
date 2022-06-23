import dotenv from 'dotenv';

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
