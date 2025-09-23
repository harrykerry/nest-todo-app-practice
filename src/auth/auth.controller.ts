import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { successResponse } from 'src/helpers/response.handler';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    const registerdUser = await this.authService.registerUser(createUserDto);

    const registerResponse = plainToInstance(UserResponseDto, registerdUser, {
      excludeExtraneousValues: true,
    });

    return successResponse(
      HttpStatus.CREATED,
      'User created successfully',
      registerResponse,
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { user, token } = await this.authService.login(loginDto);

    const userResponse = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return successResponse(HttpStatus.OK, 'Login successful', {
      user: userResponse,
      token,
    });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    return successResponse(HttpStatus.OK, 'Logged out successfully', null);
  }
}
