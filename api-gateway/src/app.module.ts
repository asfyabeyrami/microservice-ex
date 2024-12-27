import { Module } from '@nestjs/common';
import { GatewayController } from './api-gateway.controller';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [],
})
export class AppModule {}
