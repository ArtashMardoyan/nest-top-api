import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';

@Controller('top-page')
export class TopPageController {
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async get(@Param('id', IdValidationPipe) id: string) {}

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id', IdValidationPipe) id: string) {}

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id', IdValidationPipe) id: string, @Body() dto: Omit<TopPageModel, '_id'>) {}

    @Post('find')
    @HttpCode(HttpStatus.OK)
    async find(@Body() dto: FindTopPageDto) {}
}
