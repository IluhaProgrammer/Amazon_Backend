import { Controller, Get, Post } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('main')
  @Auth()
  getMainStatistic(@CurrentUser('id') id : number) {
    return this.statisticService.getMain(id)
  }

}
