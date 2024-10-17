import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDteo {
  @ApiProperty({
    type: 'file',
    format: 'binary',
  })
  imgUrl: any;
}
