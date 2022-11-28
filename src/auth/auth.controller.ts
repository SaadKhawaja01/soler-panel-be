import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

// @ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/Signup')
  SignUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.Signup(authCredentialsDto);
  }

  @Post('/Signin')
  SignIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>  {
    return this.authService.SignIn(authCredentialsDto);
  }
}
