import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

import { UsersService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [ UsersService ],
  exports: [ UsersService ],
})
export class UsersModule {}
