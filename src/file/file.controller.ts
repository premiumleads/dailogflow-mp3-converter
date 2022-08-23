import { Controller, Post, Body, Response } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  async create(@Body() createFileDto: CreateFileDto) {
		const fileResult = await this.fileService.create(createFileDto);

		const result = {
				fulfillmentMessages: [
					{
						"text": {
							"text": [
								fileResult
							]
						}
					}
				]
			}

    return result;
  }
}
