import { HttpStatus, INestApplication } from '@nestjs/common';
import { CreateUserInputDto } from '../../src/moduls/user-accounts/api/input-dto/users.input-dto';
import { UserViewDto } from '../../src/moduls/user-accounts/api/view-dto/users.view-dto';
import request from 'supertest';

export class UsersTestManager {
  constructor(private app: INestApplication) {}
  async createUser(
    createModel: CreateUserInputDto,
    statusCode: number = HttpStatus.CREATED,
  ): Promise<UserViewDto> {
    const responce = await request(this.app.getHttpServer())
      .post('/api/users')
      .send(createModel)
      .expect(statusCode);
    return responce.body;
  }
}
