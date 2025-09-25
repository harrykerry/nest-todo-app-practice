import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const task = this.taskRepo.create({ ...createTaskDto, user });

    return await this.taskRepo.save(task);
  }

  async findAllForUser(userId: string) {
    const tasks = await this.taskRepo.find({ where: { user: { id: userId } } });

    return tasks;
  }

  async findOne(userId: string, id: string) {
    const tasks = await this.taskRepo.find({
      where: { id, user: { id: userId } },
    });

    return tasks;
  }

  async update(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, updateTaskDto);

    const updatedTask = await this.taskRepo.save(task);

    return updatedTask;
  }

  async remove(id: string) {
    const task = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.deletedAt = new Date();
    await this.taskRepo.save(task);

    return id;
  }
}
