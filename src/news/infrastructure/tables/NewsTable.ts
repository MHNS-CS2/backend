import {TableFromModel} from "@steroidsjs/nest/infrastructure/decorators/TableFromModel";
import {IDeepPartial} from "@steroidsjs/nest/usecases/interfaces/IDeepPartial";
import {NewsModel} from "src/news/domain/model/NewsModel";


@TableFromModel(NewsModel, 'news')
export class NewsTable implements IDeepPartial<NewsModel> { }