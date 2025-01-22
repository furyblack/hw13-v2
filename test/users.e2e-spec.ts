import { CreateUserDto } from '../src/moduls/user-accounts/dto/create-user.dto';
import { UsersTestManager } from './helpers/users-test-manager';
import { JwtService } from '@nestjs/jwt';
import { INestApplication } from '@nestjs/common';
import { initSettings } from './helpers/init-settings';
import { deleteAllData } from './helpers/delete-all-data';

describe('users', () => {
  let app: INestApplication;
  let userTestManger: UsersTestManager;
  beforeAll(async () => {
    const result = await initSettings((moduleBuider) => {
      moduleBuider.overrideProvider(JwtService).useValue(
        new JwtService({
          secret: 'access-token-secret',
          signOptions: { expiresIn: '2s' },
        }),
      );
    });
    app = result.app;
    userTestManger = result.userTestManger;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await deleteAllData(app);
  });
  it('should create a new user', async () => {
    const body: CreateUserDto = {
      login: 'name1',
      password: 'qwerty',
      email: 'email@email.em',
    };

    const response = await userTestManger.createUser(body);
    expect(response).toEqual({
      login: body.login,
      email: body.email,
      id: expect.any(String),
      createdAt: expect.any(String),
    });
  });
});
