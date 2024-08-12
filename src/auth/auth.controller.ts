import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterUserDto } from './dto';
import { User } from './entities/user.entity';
import { Auth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login( @Body() loginDto: LoginDto  ) {
    return this.authService.login( loginDto );
  }

  @Post('/register')
  register( @Body() registerDto: RegisterUserDto  ) {
    return this.authService.register( registerDto );
  }

  @Get('check-status')
  @Auth()
  checkToken( @Request() req: Request ) {      
    const user = req['user'] as User;
    const { _id,email,fullName,password,isActive,roles, ...rest } = user;
    return {
      user: { _id, email, name, isActive, roles },
      token: this.authService.getJwtToken({ email: user.email })
    }
  }
}
