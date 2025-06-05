import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private users: UserService) {}

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.users.findByEmail(email);
  }
}
