import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';
import { MailService } from '../mail/mail.service';
import { Connection } from '../connection/connection';
import { UserRepository } from '../user-repository/user-repository';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        MailService,
        Connection,
        UserRepository,
        {
          provide: 'EmailService',
          useExisting: MailService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello', async () => {
    const response = await controller.sayHello('Anggyar');
    expect(response).toBe('Hello Anggyar');
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  it('should can view Template', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Anggyar', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'Anggyar',
      title: 'Template Engine',
    });
  });
});
