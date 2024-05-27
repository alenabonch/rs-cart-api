import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { v4 } from 'uuid';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOneByName(name: string): Promise<User> {
    return this.usersRepository.findOneBy({name});
  }

  async createOne({ name, password }: User): Promise<User> {
    const id = v4(v4());
    const newUser = { id, name, password };
    const insertedUser = await this.usersRepository.insert(newUser);

    return {
      id: insertedUser.raw[0].id,
      name,
      password,
    };
  }

}
