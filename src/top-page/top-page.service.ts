import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

    async create(dto: CreateTopPageDto) {
        return this.topPageModel.create(dto);
    }

    async get(id: string) {
        return this.topPageModel.findById(id).exec();
    }

    async getByAlias(alias: string) {
        return this.topPageModel.findOne({ alias }).exec();
    }

    async delete(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async find(dto: FindTopPageDto) {
        // return this.topPageModel
        //     .find({ firstCategory: dto.firstCategory }, { alias: 1, firstCategory: 1, secondCategory: 1 })
        //     .exec();

        return this.topPageModel
            .aggregate()
            .match({ firstCategory: dto.firstCategory })
            .group({
                _id: { secondCategory: '$secondCategory' },
                pages: { $push: { alias: '$alias', title: '$title' } }
            })
            .exec();
    }

    async search(text: string) {
        return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
    }
}
