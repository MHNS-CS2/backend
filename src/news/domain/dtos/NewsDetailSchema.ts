import {ExtendField} from '@steroidsjs/nest/infrastructure/decorators/fields/ExtendField';
import {FileImageSchema} from '@steroidsjs/nest-file/infrastructure/schemas/FileImageSchema';
import {NewsModel} from '../model/NewsModel';

export class NewsDetailSchema {
    @ExtendField(NewsModel)
    id: number;

    @ExtendField(NewsModel)
    title: string;

    @ExtendField(NewsModel)
    description: string;

    @ExtendField(NewsModel, {
        relationClass: () => FileImageSchema,
    })
    files: FileImageSchema[];

    @ExtendField(NewsModel)
    filesIds: number[];

    @ExtendField(NewsModel)
    createTime: string;
    @ExtendField(NewsModel)
    updateTime: string;
}
