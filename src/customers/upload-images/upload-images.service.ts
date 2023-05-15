import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import {
  defaultCustomerImage,
  deleteImage,
  nameSs3Bucket,
} from './types/uploads.constants';
import { unlink } from 'node:fs/promises';
import { CustomerService } from '../customer.service';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadImagesService {
  private s3Client = new S3Client({
    region: this.configService.getOrThrow<string>('AWS_S3_REGION'),
  });
  constructor(
    private readonly customersService: CustomerService,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    private configService: ConfigService,
  ) {}

  async updateByDefaultCustomerImageByIdLocal(
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

  async deleteCustomerImageLocal(
    pathImage: string,
    id: number,
  ): Promise<string> {
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

  async uploadImageAWS(filename: string, file: Buffer) {
    try {
      const awsRezult = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: nameSs3Bucket,
          Body: file,
          Key: filename,
        }),
      );
      console.log(awsRezult.Expiration);
      console.log(awsRezult.ETag);
      return awsRezult.SSEKMSKeyId;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
