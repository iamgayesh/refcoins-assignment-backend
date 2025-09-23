import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const userObj = (user as any).toObject ? (user as any).toObject() : user;
      const { password, ...result } = userObj;
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    // Default error response
    let response = {
      responseCode: '01',
      responseMsg: 'Invalid credentials',
      content: null,
      exception: null,
    };

    try {
      const user = await this.validateUser(username, password);

      if (!user) {
        return response;
      }

      const payload = {
        username: user.username,
        sub: user._id,
        userType: user.userType,
      };

      const accessToken = this.jwtService.sign(payload);

      response = {
        responseCode: '00',
        responseMsg: 'Login successful',
        content: {
          access_token: accessToken,
          user: {
            id: user._id,
            username: user.username,
            userType: user.userType,
          },
        },
        exception: null,
      };
    } catch (error) {
      response.exception = error.message;
    }

    return response;
  }
}
