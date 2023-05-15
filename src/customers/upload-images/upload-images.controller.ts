import {
  Controller,
  Delete,
  Param,
  ParseFilePipe,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';
import {
  defaultCustomerImage,
  multerOptionsLocal,
  pipeValidators,
} from './types/uploads.constants';
import { UploadImagesService } from './upload-images.service';
import { CurrentCustomer } from '../decorators/customer.decorator';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerService } from '../customer.service';
import { CustomerType } from '../types/response-customer.type';

@Controller('customers/upload-images')
export class UploadImagesController {
  constructor(
    private readonly uploadImagesService: UploadImagesService,
    private readonly customersService: CustomerService,
  ) {}

  @Patch('upload-local/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', multerOptionsLocal))
  async uploadImageLocal(
    @UploadedFile(new ParseFilePipe(pipeValidators))
    file: Express.Multer.File,
    @CurrentCustomer() currentCustomer: CustomerEntity,
    @Param('id') id: string,
  ): Promise<CustomerType> {
    const response = file.path;
    const path =
      await this.uploadImagesService.updateByDefaultCustomerImageByIdLocal(
        currentCustomer,
        +id,
        response,
      );
    await this.uploadImagesService.deleteCustomerImageLocal(path, +id);
    const customer = await this.customersService.findCustomerById(+id);
    return this.customersService.buildCustomerResponse(customer);
  }

  @Delete('delete-local/:id')
  @UseGuards(AuthGuard)
  async deleteImageLocal(
    @CurrentCustomer() currentCustomer: CustomerEntity,
    @Param('id') id: string,
  ): Promise<string> {
    const path =
      await this.uploadImagesService.updateByDefaultCustomerImageByIdLocal(
        currentCustomer,
        +id,
        defaultCustomerImage,
      );
    return this.uploadImagesService.deleteCustomerImageLocal(path, +id);
  }

  @Patch('upload-aws/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', multerOptionsLocal))
  async uploadImageAWS(
    @UploadedFile(new ParseFilePipe(pipeValidators))
    file: Express.Multer.File,
    @CurrentCustomer() currentCustomer: CustomerEntity,
    @Param('id') id: string,
  ) {
    await this.uploadImagesService.uploadImageAWS(
      file.originalname,
      file.buffer,
    );
  }
}
