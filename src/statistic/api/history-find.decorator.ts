import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { HistoryFindApiResponse } from '@app/statistic/api/types/history-find.response';

export function ApiHistoryFind() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiParam({
      name: 'id',
      required: true,
      description: 'Customer identifier',
    }),
    ApiOperation({ summary: 'Get customer by id' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      type: HistoryFindApiResponse,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'No authorized',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'No search data for this id',
    }),
  );
}
