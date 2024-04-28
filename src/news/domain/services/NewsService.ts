import {CrudService} from "@steroidsjs/nest/usecases/services/CrudService";
import {NewsModel} from "../model/NewsModel";
import {NewsSearchDto} from "../dtos/NewsSearchDto";
import {NewsSaveDto} from "../dtos/NewsSaveDto";
import {SearchResultDto} from "@steroidsjs/nest/usecases/dtos/SearchResultDto";
import {ContextDto} from "@steroidsjs/nest/usecases/dtos/ContextDto";
import {Type} from "@nestjs/common";
import SearchQuery from "@steroidsjs/nest/usecases/base/SearchQuery";
import {INewsRepository} from "../interfaces/INewsRepository";
import {NewsFormDto} from "../dtos/NewsFormDto";
import {NewsSchema} from "../dtos/NewsSchema";

export class NewsService extends CrudService<NewsModel, NewsSearchDto, NewsSaveDto> {
    protected modelClass = NewsModel;

    constructor(public repository: INewsRepository) {
        super();
    }

    async search<TSchema>(
        dto: NewsSearchDto,
        context?: ContextDto,
        schemaClass?: Type<TSchema>
    ): Promise<SearchResultDto<NewsModel | any>> {
        const searchQuery =
            schemaClass
                ? SearchQuery.createFromSchema<NewsModel>(schemaClass)
                : new SearchQuery<NewsModel>();


        searchQuery.filterWhere({id: dto.id})


        const result = await this.repository.search<TSchema>(dto, searchQuery);

        if (schemaClass) {
            result.items = result.items.map((model: NewsModel) => this.modelToSchema(model, schemaClass))
        }

        return result;
    }

    async createOrUpdate(formDto: NewsFormDto, context: ContextDto) {
        let news;

        if (formDto.id) {
            news = await this.update(formDto.id, formDto, context, NewsSchema)
        } else {
            news = await this.create(formDto, context, NewsSchema)
        }

        return news;
    }


    async delete(id: number) {
        return this.repository.remove(id)
    }
}