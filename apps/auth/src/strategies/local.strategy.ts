import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  /*
  For each strategy, Passport will call the verify function (implemented with the validate() 
  method in @nestjs/passport) using an appropriate strategy-specific 
  set of parameters.

  If a user is found and the credentials are valid, 
  the user is returned so Passport can complete its tasks 
  (e.g., creating the user property on the Request object), 
  and the request handling pipeline can continue. 
  
  If it's not found, we throw an exception and 
  let our exceptions layer handle it.
  */
  async validate(email: string, password: string) {
    try {
      return await this.usersService.verifyUser(email, password);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
