import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModelType } from '../domain/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  //инжектирование модели через DI
  constructor(@InjectModel(User.name) private UserModel: UserModelType) {}

  async save(user: UserDocument) {
    await user.save();
  }
  // async findOrNotFoundFail(id: string): Promise<UserDocument> {
  //   const user = await this.findById(id);
  //
  //   if (!user) {
  //     //TODO: replace with domain exception
  //     throw new NotFoundException('user not found');
  //   }
  //
  //   return user;
  // }
}
