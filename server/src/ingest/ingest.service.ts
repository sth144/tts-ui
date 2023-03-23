import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import * as gTTS from 'gtts';
import { join } from 'path';

export interface ITextInput {
  title: string;
  body: string;
}

@Injectable()
export class IngestService {
  public async synthesizeMP3FromInput(input: ITextInput): Promise<string> {
    const filepathSanitized: string = this.sanitizedFilepathFromTitle(
      input.title,
    );
    if (filepathSanitized.includes('/')) {
      const split = filepathSanitized.split('/');
      split.pop();
      let dirpath = '';
      for (const item of split) {
        dirpath += `${item}/`;
      }
      execSync(`mkdir -p ${join(process.cwd(), '../output')}/${dirpath}`);
    }
    var gtts = new gTTS(input.body, 'en');
    const saved = gtts.save(
      join(process.cwd(), `../output/${filepathSanitized}`),
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

  private sanitizedFilepathFromTitle(title: string): string {
    return `${title.toLocaleLowerCase().replace(' ', '-')}.mp4`;
  }
}
