import { Module } from '@nestjs/common';
import { LineasService } from './lineas.service';
import { LineasController } from './lineas.controller';

@Module({
  controllers: [LineasController],
  providers: [LineasService]
})
export class LineasModule {}
