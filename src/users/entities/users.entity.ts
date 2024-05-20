import { Carts } from 'src/cart/entities/carts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from '../../order/entities/orders.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text')
  name: string;

  @Column({type: 'text', nullable: true})
  email?: string;

  @Column('text')
  password?: string;

  @OneToMany(
    () => Carts,
    cart => cart.id
  )
  carts: Carts[];

  @OneToMany(
    () => Orders,
    order => order.id,
  )
  orders: Orders[];
}
