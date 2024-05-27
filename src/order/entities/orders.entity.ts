import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Carts } from '../../cart/entities/carts.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  cart_id: string;

  @Column('json')
  payment: Record<string, unknown>;

  @Column('json')
  delivery: Record<string, unknown>;

  @Column('text')
  comments: string;

  @Column({type: 'enum', enum: ['IN_PROGRESS', 'DELIVERED']})
  status: 'IN_PROGRESS' | 'DELIVERED';

  @Column('integer')
  total: number;

  @OneToOne(
    () => Carts,
    cart => cart.id
  )
  @JoinColumn({ name: 'cart_id' })
  cart: Carts;

  @ManyToOne(
    () => Users,
    user => user.id
  )
  user: Users;
}



