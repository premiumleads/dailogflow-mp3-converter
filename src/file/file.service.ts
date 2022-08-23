import { Injectable } from '@nestjs/common';
import { AudioConfig, SpeechConfig, SpeechSynthesisOutputFormat, SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';
import { CreateFileDto } from './dto/create-file.dto';
import { v4 as uuidv4 } from "uuid";


@Injectable()
export class FileService {

	constructor() {}

  async create(createFileDto: CreateFileDto): Promise<string> {
		const filename = uuidv4();

		const speechConfig= SpeechConfig.fromSubscription(process.env.AZURE_SUB_KEY, process.env.AZURE_REGION);
		speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio24Khz160KBitRateMonoMp3;

		const audioConfig = AudioConfig.fromAudioFileOutput(`public/${filename}.mp3`);

		const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

		synthesizer.speakTextAsync(
			createFileDto.queryResult.fulfillmentText,
			result => {
				if(result) {
					console.log(JSON.stringify(result));
				}
				synthesizer.close();
			},
			error => {
				console.log(error);
				synthesizer.close();
			}
		)

		const downloadURL = `${filename}.mp3`;

		return downloadURL;
  }
}
