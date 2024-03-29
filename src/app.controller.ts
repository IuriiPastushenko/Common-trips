import { Controller, Get } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
