import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartItems } from './entities/cart-items.entity';
import { Carts } from './entities/carts.entity';
import { CartService } from './services';


@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forFeature([Carts, CartItems]),
  ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
