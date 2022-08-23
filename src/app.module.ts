import {HttpModule} from '@nestjs/axios';
import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import { FileModule } from './file/file.module';

@Module({
  imports: [
		ConfigModule.forRoot(),
		HttpModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public/')
		}),
		FileModule,
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
