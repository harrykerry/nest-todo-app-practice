import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, firstName, lastName, emailAddress, password } =
      createUserDto;

    if (username) {
      const existing = await this.userRepo.findOne({ where: { username } });
      if (existing) {
        throw new BadRequestException('Username is already in use.');
      }
    }
    const user = this.userRepo.create({
      firstName,
      lastName,
      username,
      emailAddress,
      password: await bcrypt.hash(password, 10),
    });
    return await this.userRepo.save(user);
  }

  findAll() {
    const users = this.userRepo.find();
    return users;
  }

  findOne(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  findByUsername(username: string) {
    return this.userRepo.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { firstName, lastName, username, emailAddress } = updateUserDto;

    let updated = false;

    if (firstName !== undefined) {
      user.firstName = firstName;
      updated = true;
    }
    if (lastName !== undefined) {
      user.lastName = lastName;
      updated = true;
    }
    if (username !== undefined) {
      user.username = username;
      updated = true;
    }
    if (emailAddress !== undefined) {
      user.emailAddress = emailAddress;
      updated = true;
    }

    if (!updated) {
      throw new BadRequestException('No updatable fields provided');
    }

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (username !== undefined) user.username = username;
    if (emailAddress !== undefined) user.emailAddress = emailAddress;

    const updatedUser = await this.userRepo.save(user);

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.deletedAt = new Date();
    await this.userRepo.save(user);

    return id;
  }
}
