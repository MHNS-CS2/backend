import {ExtendField} from "@steroidsjs/nest/infrastructure/decorators/fields/ExtendField";
import {NewsModel} from "../model/NewsModel";

export class NewsSaveDto {
    @ExtendField(NewsModel)
    id: number

    @ExtendField(NewsModel)
    title: string;

    @ExtendField(NewsModel)
    description: string;

    @ExtendField(NewsModel)
    filesIds: number[];
}