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
    userType: 'ADMIN' | 'CUSTOMER',
  ): Promise<any> {
    let response = {
      responseCode: '01',
      responseMsg: 'Failed to create user',
      content: null,
      exception: null,
    };

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new this.userModel({
        username,
        password: hashedPassword,
        userType,
      });
      const saved = await user.save();

      response = {
        responseCode: '00',
        responseMsg: 'Success',
        content: saved,
        exception: null,
      };
    } catch (error) {
      response.exception = error.message;
    }

    return response;
  }

  // Find all users
  async findAll(): Promise<any> {
    let response = {
      responseCode: '01',
      responseMsg: 'Failed to retrieve users',
      content: [],
      exception: null,
    };

    try {
      const users = await this.userModel
        .find()
        .select('username userType') // only include these fields
        .exec();

      response = {
        responseCode: '00',
        responseMsg: 'Success',
        content: users,
        exception: null,
      };
    } catch (error) {
      response = {
        responseCode: '01',
        responseMsg: 'Failed',
        content: null,
        exception: (error as Error).message,
      };
    }

    return response;
  }

  // Find user by username
  async findByUsername(username: string): Promise<any> {
    let response = {
      responseCode: '01',
      responseMsg: 'User not found',
      content: null,
      exception: null,
    };

    try {
      const user = await this.userModel.findOne({ username }).exec();

      if (user) {
        response = {
          responseCode: '00',
          responseMsg: 'Success',
          content: user,
          exception: null,
        };
      }
    } catch (error) {
      response.exception = error.message;
    }

    return response;
  }

  // Find user by username for JWT strategy (returns raw user object)
  async findUserByUsername(username: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ username }).exec();
    } catch (error) {
      return null;
    }
  }

  // Validate password
  async validateUser(username: string, password: string): Promise<any> {
    let response = {
      responseCode: '01',
      responseMsg: 'Invalid username or password',
      content: false,
      exception: null,
    };

    try {
      const user = await this.userModel.findOne({ username }).exec();

      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          response = {
            responseCode: '00',
            responseMsg: 'Login successful',
            content: true,
            exception: null,
          };
        }
      }
    } catch (error) {
      response.exception = error.message;
    }

    return response;
  }
}
