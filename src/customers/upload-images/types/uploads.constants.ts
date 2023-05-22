import { diskStorage } from 'multer';
import { uploadSaveFileName } from './upload-save-name.type';
import { MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';

export const multerOptionsLocal = {
  storage: diskStorage({
    destination: './src/upload',
    filename: uploadSaveFileName,
  }),
};

export const pipeValidators = {
  validators: [
    new MaxFileSizeValidator({ maxSize: 100000 }),
    new FileTypeValidator({ fileType: '.(jpeg|jpg|png)' }),
  ],
};

export const defaultCustomerImage = 'src/upload/Default-c003.png';

export const deleteImage = 'Image was deleted successfully';

export const nameSs3Bucket = 'imageofcustomers';

export const hostAWS = 'imageofcustomers.s3.eu-central-1.amazonaws.com'
