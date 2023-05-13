import { diskStorage } from 'multer';
import { uploadSaveFileName } from './upload-save-name.type';
import { MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';

export const multerOptions = {
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
