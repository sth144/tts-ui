import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { IngestService } from './ingest.service';

@Controller('ingest')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post('text-input')
  private async postTextInputForSynthesis(
    @Body() requestBody,
  ): Promise<string> {
    return await this.ingestService.synthesizeMP3FromInputText(requestBody);
  }

  @Post('file-input')
  @UseInterceptors(AnyFilesInterceptor())
  // @UseInterceptors(FileInterceptor('file'))
  private async postFileInputsForSynthesis(
    @UploadedFiles() files,
    @Body() requestBody,
  ): Promise<string> {
    const fileContents = files[0].buffer.toString();
    const filename = files[1].buffer.toString();
    // TODO: handle directory paths
    const input = {
      title: filename.replace('.txt', ''),
      body: fileContents.toString(),
    };

    return await this.ingestService.synthesizeMP3FromInputText(input);
  }
}
