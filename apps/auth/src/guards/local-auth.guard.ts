import { AuthGuard } from '@nestjs/passport';

/*
Each Strategy from a passport-* package has a name property that is the name for 
the strategy. For passport-local that name is local. For passport-jwt, 
that name is 'jwt'. This doesn't always line up one to one, 
but each package should document what its name for passport is. 
This is the name that gets passed to passport.use() 
and passport.authenticate().passport.use is called via some clever code in the 
PassportStrategy class from @nestjs/passport to register the strategy with 
passport and passport.authenticate is called inside of the AuthGuard() 
using either the global default set via the passport module's options or 
via the mixin's parameters, like local in your code sample.
*/
export class LocalAuthGuard extends AuthGuard('local') {}
