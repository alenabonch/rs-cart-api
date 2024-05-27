import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
