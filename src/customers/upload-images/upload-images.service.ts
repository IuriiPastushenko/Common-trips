import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { defaultCustomerImage, deleteImage } from './types/uploads.constants';
import { unlink } from 'node:fs/promises';
import { CustomerService } from '../customer.service';

@Injectable()
export class UploadImagesService {
  constructor(
    private readonly customersService: CustomerService,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async updateByDefaultCustomerImageById(
    currentCustomer: CustomerEntity,
    id: number,
    imageForSave: string,
  ): Promise<string> {
    const customer = await this.customersService.getCustomerByIdAndRoles(
      currentCustomer,
      id,
    );
    const path = customer.image;
    const dataForSave = { image: imageForSave };
    Object.assign(customer, dataForSave);
    await this.customerRepository.save(customer);
    return path;
  }

  async deleteCustomerImage(pathImage: string, id: number): Promise<string> {
    try {
      if (pathImage === defaultCustomerImage) {
        return `Customer ${id} has image by default`;
      }
      await unlink(pathImage);
      return deleteImage;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
