import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';

//to impliment Jwt on routes of other modules, we create this file
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //to get user repository because we want to work with users
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      //first thing is secret key same as before
      secretOrKey: 'solarpanel',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //it tells passport , how to extract token
    });
  }

  //we know token is valid now what do we need to do with payload,
  //we want to fetch that user from the db
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    //now grab the user from the db
    const user: User = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    //injected into the request object of our controller
    return user;
  }
}
