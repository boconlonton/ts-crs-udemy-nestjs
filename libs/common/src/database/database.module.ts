import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(
          'MONGODB_USER',
        )}:${configService.get('MONGODB_PASSWORD')}@${configService.get(
          'MONGODB_HOST',
        )}:${configService.get('MONGODB_PORT')}/${configService.get(
          'MONGODB_DATABASE',
        )}?authSource=admin`,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
