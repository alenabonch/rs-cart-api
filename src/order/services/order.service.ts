import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Carts } from '../../cart/entities/carts.entity';
import { Orders } from '../entities/orders.entity';

import { Order } from '../models';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    private dataSource: DataSource,
  ) {}

  async findById(orderId: string): Promise<Orders> {
    return this.ordersRepository.findOne({
      where: { id: orderId },
    });
  }

  async create(data: any): Promise<Order | null> {
    const id = v4(v4())

    const orderToCreate = {
      id,
      user_id: data.userId,
      cart_id: data.cart.id,
      payment: data.address,
      delivery: data.address,
      comments: data.address.comment,
      total: data.total,
      status: 'IN_PROGRESS'
    } as Orders;

    try {
      await this.dataSource.manager.transaction(async (entityManager) => {

        // create order
        const transactionalOrdersRepo = entityManager.getRepository(Orders);
        const newOrder = transactionalOrdersRepo.create(orderToCreate);
        const savedOrder = await transactionalOrdersRepo.insert(newOrder);

        // update cart status
        const transactionalCartsRepo = entityManager.getRepository(Carts);
        await transactionalCartsRepo.update({id: data.cart.id}, {status: 'ORDERED'});

        return savedOrder;
      })
    } catch (e) {
      console.log('Error creating order transaction', e);
      return null;
    }
  }
}
