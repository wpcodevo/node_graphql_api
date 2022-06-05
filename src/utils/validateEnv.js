import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),

    MONGODB_URI_LOCAL: str(),
    MONGO_INITDB_ROOT_USERNAME: str(),
    MONGO_INITDB_ROOT_PASSWORD: str(),
    MONGO_INITDB_DATABASE: str(),

    JWT_ACCESS_PRIVATE_KEY: str(),
    JWT_ACCESS_PUBLIC_KEY: str(),

    JWT_REFRESH_PRIVATE_KEY: str(),
    JWT_REFRESH_PUBLIC_KEY: str(),
  });
};

export default validateEnv;
