import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { OrderService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
  ],
  providers: [ OrderService ],
  exports: [ OrderService ]
})
export class OrderModule {}
