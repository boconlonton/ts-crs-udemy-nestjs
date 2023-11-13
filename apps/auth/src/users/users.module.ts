import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { User } from '@app/common';
import { UserRepository } from './users.repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User]), LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
