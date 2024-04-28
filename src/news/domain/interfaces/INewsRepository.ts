import {ICrudRepository} from "@steroidsjs/nest/usecases/interfaces/ICrudRepository"
import {NewsModel} from "../model/NewsModel"

export const INewsRepository = 'INewsRepository';

export type INewsRepository = ICrudRepository<NewsModel>