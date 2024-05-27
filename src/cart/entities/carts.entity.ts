import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { CartItems } from './cart-items.entity';

@Entity()
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('date', {nullable: false})
  created_at: Date;

  @Column('date', {nullable: false})
  updated_at: Date;

  @Column({type: 'enum', enum: ['OPEN', 'ORDERED']})
  status: 'OPEN' | 'ORDERED';

  @ManyToOne(
    () => Users,
    user => user.carts
  )
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: Users[];

  @OneToMany(
    () => CartItems,
    cartItem => cartItem.carts,
    {cascade: true, eager: true}
  )
  items: CartItems[];
}
