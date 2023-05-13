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
  multerOptions,
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
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImageLocal(
    @UploadedFile(new ParseFilePipe(pipeValidators))
    file: Express.Multer.File,
    @CurrentCustomer() currentCustomer: CustomerEntity,
    @Param('id') id: string,
  ): Promise<CustomerType> {
    const response = file.path;
    const path =
      await this.uploadImagesService.updateByDefaultCustomerImageById(
        currentCustomer,
        +id,
        response,
      );
    await this.uploadImagesService.deleteCustomerImage(path, +id);
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
      await this.uploadImagesService.updateByDefaultCustomerImageById(
        currentCustomer,
        +id,
        defaultCustomerImage,
      );
    return this.uploadImagesService.deleteCustomerImage(path, +id);
  }
}
