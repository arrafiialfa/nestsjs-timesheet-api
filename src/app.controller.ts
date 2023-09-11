import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('/favicon.ico')
  getFavicon(@Response() res) {
    return res.status(204).json({ data: "No Content" })
  }
}
