import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Carts } from './carts.entity';

@Entity()
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  cart_id: string;

  @Column('uuid')
  product_id: string;

  @Column('integer')
  count: number;

  @ManyToOne(
    () => Carts,
    cart => cart.items,
    {onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: 'delete'}
  )
  @JoinColumn({ name: 'cart_id' })
  carts: Carts;
}



