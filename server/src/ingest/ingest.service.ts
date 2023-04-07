import { Injectable } from '@nestjs/common';
import * as gTTS from 'gtts';
import { FilepathService } from '../shared/filepath/filepath.service';

export interface ITextInput {
  title: string;
  body: string;
}

@Injectable()
export class IngestService {
  constructor(private filepathService: FilepathService) {}

  public async synthesizeMP3FromInputText(input: ITextInput): Promise<string> {
    const filepathSanitized: string =
      this.filepathService.sanitizedFilepathFromTitle(input.title);
    this.filepathService.ensureRelativePathAvailable(filepathSanitized);

    var gtts = new gTTS(input.body, 'en');

    const saved = gtts.save(
      this.filepathService.getRelativeOutputPath(filepathSanitized),
      function (err, result) {
        if (err) {
          throw new Error(err);
        }
        console.log(
          `Success! Open file output/${filepathSanitized} to hear result.`,
        );
      },
    );
    await saved;

    return filepathSanitized;
  }
}
