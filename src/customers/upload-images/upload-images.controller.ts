import {
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';
import { multerOptions, pipeValidators } from './types/uploads.constants';

@Controller('customers/upload-images')
export class UploadImagesController {
  @Post('upload-local')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImageLocal(
    @UploadedFile(new ParseFilePipe(pipeValidators))
    file: Express.Multer.File,
  ) {
    const response = { path: file.path };
    return response;
  }
}
