import { Injectable } from '@nestjs/common';
import { User, UserModelType } from '../../domain/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserViewDto } from '../../api/view-dto/users.view-dto';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectModel(User.name)
    private UserModel: UserModelType,
  ) {}
  async getUserById(userId: string): Promise<UserViewDto | null> {
    const user = await this.UserModel.findById(userId).lean();

    if (!user) return null;

    return this.mapToUserViewDto(user);
  }
}
