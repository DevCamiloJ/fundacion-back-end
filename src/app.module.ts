import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/';
import { MembersModule } from './members/members.module';
import { CountriesModule } from './countries/countries.module';
import { DepartmentsModule } from './departments/departments.module';
import { CitiesModule } from './cities/cities.module';
import { EducationalInstitutionsModule } from './educational-institutions/educational-institutions.module';
import { EpsModule } from './eps/eps.module';
import { InterestTopicModule } from './interest-topic/interest-topic.module';
import { SisbenScoreModule } from './sisben-score/sisben-score.module';
import { PopulationGroupModule } from './population-group/population-group.module';
import { PopulationTypeModule } from './population-type/population-type.module';
import { EthnicGroupModule } from './ethnic-group/ethnic-group.module';
import { DisabilityModule } from './disability/disability.module';
import { GuardianModule } from './guardian/guardian.module';
import { HousingModule } from './housing/housing.module';
import { FamilyCoreModule } from './family-core/family-core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        DB_TYPE: Joi.string().valid('mysql', 'postgres', 'sqlite').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql' | 'postgres' | 'sqlite'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MembersModule,
    CountriesModule,
    DepartmentsModule,
    CitiesModule,
    EducationalInstitutionsModule,
    EpsModule,
    InterestTopicModule,
    SisbenScoreModule,
    PopulationGroupModule,
    PopulationTypeModule,
    EthnicGroupModule,
    DisabilityModule,
    GuardianModule,
    HousingModule,
    FamilyCoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
