import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import {HttpModule} from '@nestjs/axios';

@Module({
	imports: [],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
