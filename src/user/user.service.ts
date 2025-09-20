import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create a new user with hashed password
  async create(
    username: string,
    password: string,
    userType: 'admin' | 'customer',
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      password: hashedPassword,
      userType,
    });
    return user.save();
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Find user by username
  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  // Validate password
  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }
}
