import { Body, Controller, Post } from '@nestjs/common';
import { IngestService } from './ingest.service';

@Controller('ingest')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post('text-input')
  private async postTextInputForSynthesis(
    @Body() requestBody,
  ): Promise<string> {
    return await this.ingestService.synthesizeMP3FromInput(requestBody);
  }
}
