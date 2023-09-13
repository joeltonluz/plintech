import { Controller, Get } from '@nestjs/common';

import {
  PrismaHealthIndicator,
  HealthCheckService,
  HealthCheck,
  DiskHealthIndicator,
} from '@nestjs/terminus';

@Controller('health-check')
export class HealthController {
  constructor(
    private readonly heathCheck: HealthCheckService,
    private readonly prismaOrmCheck: PrismaHealthIndicator,
    private readonly diskCheck: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async healthCheck() {
    return await this.heathCheck.check([
      //() => this.prismaOrmCheck.pingCheck('database'),
      () =>
        this.diskCheck.checkStorage('storage', {
          thresholdPercent: 0.9,
          path: '/',
        }),
    ]);
  }
}
