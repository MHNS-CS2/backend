import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@steroidsjs/nest-typeorm";
import {CrudRepository} from "@steroidsjs/nest/infrastructure/repositories/CrudRepository";
import {NewsModel} from "src/news/domain/model/NewsModel";
import {NewsTable} from "../tables/NewsTable";
import {Repository} from "@steroidsjs/typeorm";

@Injectable()
export class NewsRepository extends CrudRepository<NewsModel> {
    constructor(
        @InjectRepository(NewsTable)
        public dbRepository: Repository<NewsTable>,
    ) {
        super();
    }

    protected modelClass = NewsModel;
}