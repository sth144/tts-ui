import { Injectable } from '@nestjs/common';
import * as gTTS from 'gtts';
const path = require('path');

export interface ITextInput {
  title: string;
  body: string;
}

@Injectable()
export class IngestService {
  public async synthesizeMP3FromInput(input: ITextInput): Promise<string> {
    const filenameSanitized = this.sanitizedFilenameFromTitle(input.title);
    var gtts = new gTTS(input.body, 'en');
    const saved = gtts.save(
      path.join(process.cwd(), `../output/${filenameSanitized}`),
      function (err, result) {
        if (err) {
          throw new Error(err);
        }
        console.log(
          `Success! Open file output/${filenameSanitized} to hear result.`,
        );
      },
    );
    await saved;
    return filenameSanitized;
  }

  private sanitizedFilenameFromTitle(title: string): string {
    return `${title.toLocaleLowerCase().replace(' ', '-')}.mp4`;
  }
}
