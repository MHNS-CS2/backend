import {ExtendField} from "@steroidsjs/nest/infrastructure/decorators/fields/ExtendField";
import {NewsModel} from "../model/NewsModel";

export class NewsFormDto {
    @ExtendField(NewsModel)
    id: number;

    @ExtendField(NewsModel, {
        required: true,
    })
    title: string;

    @ExtendField(NewsModel, {
        required: true,
    })
    description: string;


    @ExtendField(NewsModel)
    filesIds: number[];
}