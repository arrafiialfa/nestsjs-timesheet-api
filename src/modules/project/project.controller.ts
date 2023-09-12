import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags('project')
@Public()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Post('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Post('/delete/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
