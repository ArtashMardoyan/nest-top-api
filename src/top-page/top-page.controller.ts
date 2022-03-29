import {
    Put,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UsePipes,
    HttpCode,
    Controller,
    HttpStatus,
    ValidationPipe,
    NotFoundException
} from '@nestjs/common';

import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
    constructor(private readonly topPageService: TopPageService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateTopPageDto) {
        return this.topPageService.create(dto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async get(@Param('id', IdValidationPipe) id: string) {
        const topPage = await this.topPageService.get(id);

        if (!topPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
        }

        return topPage;
    }

    @HttpCode(HttpStatus.OK)
    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const topPage = await this.topPageService.getByAlias(alias);

        if (!topPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
        }

        return topPage;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id', IdValidationPipe) id: string) {
        const topPage = await this.topPageService.delete(id);

        if (!topPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
        }

        return topPage;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
        const topPage = await this.topPageService.update(id, dto);

        if (!topPage) {
            throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
        }

        return topPage;
    }

    @Post('find')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    async find(@Body() dto: FindTopPageDto) {
        return this.topPageService.find(dto);
    }

    @Get('search/:text')
    @HttpCode(HttpStatus.OK)
    async search(@Param('text') text: string) {
        return this.topPageService.search(text);
    }
}
