import * as Joi from '@hapi/joi';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  private static connectionBaseProps = {
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
  };

  static getConnectionOptions(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'production') {
      return {
        ...this.connectionBaseProps,
        url: configService.get<string>('db.url'),
        ssl: {
          rejectUnauthorized: false,
        },
      } as TypeOrmModuleOptions;
    }

    return {
      ...this.connectionBaseProps,
      username: configService.get<string>('db.username'),
      password: configService.get<string>('db.password'),
      host: configService.get<string>('db.host'),
      port: configService.get<number>('db.port'),
      database: configService.get<string>('db.database'),
    } as TypeOrmModuleOptions;
  }

  static getConfig() {
    if (process.env.NODE_ENV === 'production') {
      return {
        db: {
          url: process.env.DATABASE_URL,
        },
      };
    }

    return {
      db: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT),
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
      },
    };
  }

  static getValidationSchema() {
    if (process.env.NODE_ENV === 'production') {
      return {
        DATABASE_URL: Joi.string().required(),
      };
    }

    return {
      DB_USER: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_HOST: Joi.string().required(),
      DB_DATABASE: Joi.string().required(),
    };
  }
}
