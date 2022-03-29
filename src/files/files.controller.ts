import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';

import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mFile.class';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
        const saveFiles: MFile[] = [new MFile(file)];

        if (file.mimetype.includes('image')) {
            const buffer = await this.filesService.convertToWebP(file.buffer);

            saveFiles.push(new MFile({ originalname: `${file.originalname.split('.')[0]}.webp`, buffer }));
        }
        return this.filesService.save(saveFiles);
    }
}
