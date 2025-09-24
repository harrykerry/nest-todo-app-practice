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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { successResponse } from 'src/helpers/response.handler';
import { plainToInstance } from 'class-transformer';
import { TaskResponseDto } from './dto/task-response.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    const tasks = await this.tasksService.create(createTaskDto);

    const taskResp = plainToInstance(TaskResponseDto, tasks, {
      excludeExtraneousValues: true,
    });

    return successResponse(
      HttpStatus.CREATED,
      'Task Created Successfully',
      taskResp,
    );
  }

  // @Get()
  // @UseGuards(JwtGuard)
  // async findAll(@Req() req: Request) {
  //   const userId = (req as any).user.sub;
  //   const tasks = await this.tasksService.findAllForUser(userId);
  //   const taskResp = plainToInstance(TaskResponseDto, tasks, {
  //     excludeExtraneousValues: true,
  //   });
  //   return successResponse(HttpStatus.OK, 'Task Fetched', taskResp);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
