import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuardianService } from './guardian.service';
import { GuardianController } from './guardian.controller';
import { Guardian } from './entities/guardian.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guardian])],
  controllers: [GuardianController],
  providers: [GuardianService],
  exports: [GuardianService]
})
export class GuardianModule {}
