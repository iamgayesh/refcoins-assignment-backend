import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret123!',
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findUserByUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      userId: (user as any)._id,
      username: user.username,
      userType: user.userType,
    };
  }
}
