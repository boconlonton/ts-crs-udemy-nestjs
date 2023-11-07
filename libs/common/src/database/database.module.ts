import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
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
