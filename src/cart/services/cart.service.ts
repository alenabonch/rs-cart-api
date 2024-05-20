import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 } from 'uuid';
import { CartItems } from '../entities/cart-items.entity';
import { Carts } from '../entities/carts.entity';

import { Cart, CartItem } from '../models';

@Injectable()
export class CartService {
  static productUrl = 'https://8oqq3o7flf.execute-api.us-east-1.amazonaws.com/dev/products';

  constructor(
    @InjectRepository(Carts)
    private cartsRepository: Repository<Carts>,
    @InjectRepository(CartItems)
    private cartItemsRepository: Repository<CartItems>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    const cartResult = await this.cartsRepository.findOne({
        where: { user_id: userId, status: 'OPEN' },
        relations: ['items'],
      }
    );
    if (cartResult) {
      return this.enrichWithProductInfo(cartResult);
    }
  }

  async createByUserId(userId: string): Promise<Cart> {
    const id = v4(v4());

    const items = [];
    const cartToCreate = {
      id,
      items,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: userId,
      status: 'OPEN',
    } as Carts;

    await this.cartsRepository.save(cartToCreate);
    return { id, items };
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, cart: Cart, status?: 'OPEN' | 'ORDERED'): Promise<Cart> {
    const cartToUpdate = await this.cartsRepository.findOne({
        where: { user_id: userId, status: 'OPEN' },
        relations: ['items'],
      }
    );
    cartToUpdate.status = status;

    // Remove existing items
    cartToUpdate.items = [];

    // Create new items and associate them with the cart
    for (const item of cart.items) {
      const cartItem = {
        cart_id: cartToUpdate.id,
        product_id: item.product.id,
        count: item.count,
      } as CartItems;

      await this.cartItemsRepository.save(cartItem);
      cartToUpdate.items.push(cartItem as any);
    }

    const updatedCartResult = await this.cartsRepository.save(cartToUpdate);
    return this.enrichWithProductInfo(updatedCartResult);
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartsRepository.delete({ user_id: userId });
  }

  private async enrichWithProductInfo(cart: Carts): Promise<Cart> {
    let cartItems: CartItem[] = [];
    for (const item of cart.items) {
      const response = await fetch(`${CartService.productUrl}/${item.product_id}`);
      if (response.ok) {
        const product = await response.json();
        cartItems.push({count: item.count, product});
      }
    }
    return { id: cart.id, items: cartItems };
  }
}
