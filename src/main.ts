import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
import * as dotenv from 'dotenv';

import helmet from 'helmet';

import { AppModule } from './app.module';
let server;
const port = process.env.PORT || 3000;

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

  await app.listen(port);
}
bootstrap().then(() => {
  console.log('App is running on %s port', port);
});

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  console.log('server bootstrapped');
  return server(event, context, callback);
};
