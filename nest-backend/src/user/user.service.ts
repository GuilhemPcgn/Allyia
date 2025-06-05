import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async create(data: any) {
    return data;
  }

  async findByEmail(_email: string) {
    return null;
  }
}
