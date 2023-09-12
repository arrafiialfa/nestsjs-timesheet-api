import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ScopeOfWorkService } from './scope-of-work.service';
import { CreateScopeOfWorkDto } from './dto/create-scope-of-work.dto';
import { UpdateScopeOfWorkDto } from './dto/update-scope-of-work.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Controller('scope-of-work')
@ApiTags('scope_of_work')
@Public()
export class ScopeOfWorkController {
  constructor(private readonly scopeOfWorkService: ScopeOfWorkService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createScopeOfWorkDto: CreateScopeOfWorkDto) {
    return this.scopeOfWorkService.create(createScopeOfWorkDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.scopeOfWorkService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.scopeOfWorkService.findOne(+id);
  }

  @Post('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateScopeOfWorkDto: UpdateScopeOfWorkDto) {
    return this.scopeOfWorkService.update(+id, updateScopeOfWorkDto);
  }

  @Post('/delete/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.scopeOfWorkService.remove(+id);
  }
}
