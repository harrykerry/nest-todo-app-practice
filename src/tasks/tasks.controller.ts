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
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { successResponse } from 'src/helpers/response.handler';
import { plainToInstance } from 'class-transformer';
import { TaskResponseDto } from './dto/task-response.dto';
import type { Request } from 'express';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: Request, @Body() createTaskDto: CreateTaskDto) {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    const tasks = await this.tasksService.create(userId, createTaskDto);

    const taskResp = plainToInstance(TaskResponseDto, tasks, {
      excludeExtraneousValues: true,
    });

    return successResponse(
      HttpStatus.CREATED,
      'Task Created Successfully',
      taskResp,
    );
  }

  @Get()
  async findAll(@Req() req: Request) {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    const tasks = await this.tasksService.findAllForUser(userId);
    const taskResp = plainToInstance(TaskResponseDto, tasks, {
      excludeExtraneousValues: true,
    });
    return successResponse(HttpStatus.OK, 'Tasks Fetched', taskResp);
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    const task = await this.tasksService.findOne(userId, id);

    const taskResp = plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });

    return successResponse(HttpStatus.OK, 'Task Fetched', taskResp);
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    const task = await this.tasksService.update(userId, id, updateTaskDto);

    const taskUpdateResp = plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });

    return successResponse(
      HttpStatus.OK,
      'Task updated successfully',
      taskUpdateResp,
    );
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    const deleteTaskResponse = await this.tasksService.remove(id);

    return successResponse(
      HttpStatus.OK,
      'Task deleted successfully',
      deleteTaskResponse,
    );
  }
}
