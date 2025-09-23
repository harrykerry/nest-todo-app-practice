import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { successResponse } from 'src/helpers/response.handler';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { UserIdParamDto } from 'src/common/dtos/user-id-param.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    const userResp = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return successResponse(
      HttpStatus.CREATED,
      'User created successfully',
      userResp,
    );
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    const usersResp = plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });

    return successResponse(HttpStatus.OK, 'Users fetched', usersResp);
  }

  @Get(':id')
  async findOne(@Param() params: UserIdParamDto) {
    const user = await this.usersService.findOne(params.id);

    if (!user) {
      return successResponse(HttpStatus.NOT_FOUND, 'User not found', user);
    }

    const foundUser = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return successResponse(HttpStatus.OK, 'Users fetched', foundUser);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);

    const userUpdateResp = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return successResponse(
      HttpStatus.OK,
      'User updated successfully',
      userUpdateResp,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteResponse = await this.usersService.remove(id);

    return successResponse(
      HttpStatus.OK,
      'User deleted successfully',
      deleteResponse,
    );
  }
}
