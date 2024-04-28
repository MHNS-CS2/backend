import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Query} from "@nestjs/common";
import {ApiOkResponse, ApiOkResponse as ApiOkSearchResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {NewsSchema} from "src/news/domain/dtos/NewsSchema";
import {NewsService} from "src/news/domain/services/NewsService";
import {NewsSaveDto} from "src/news/domain/dtos/NewsSaveDto";
import {Context} from "@steroidsjs/nest/infrastructure/decorators/Context";
import {NewsSearchDto} from "src/news/domain/dtos/NewsSearchDto";
import {DataMapper} from '@steroidsjs/nest/usecases/helpers/DataMapper';
import {ContextDto} from "@steroidsjs/nest/usecases/dtos/ContextDto";
import {NewsFormDto} from "src/news/domain/dtos/NewsFormDto";
import {NewsDetailSchema} from "src/news/domain/dtos/NewsDetailSchema";

@ApiTags('Новости')
@Controller('/news')
export class NewsAdminController {
    constructor(private newsService: NewsService) { }

    @Get()
    @ApiOperation({summary: 'Получение всех новостей'})
    @ApiOkSearchResponse({type: NewsDetailSchema})
    async search(
        @Query() dto: NewsSearchDto,
        @Context() context,
    ) {
        return this.newsService.search(dto, context, NewsDetailSchema)
    }

    @Get('/:id')
    @ApiOperation({summary: 'Детальная информация новости'})
    @ApiOkSearchResponse({type: NewsDetailSchema})
    async getOne(
        @Param('id') id: number,
        @Context() context,
    ) {

        const news = await this.newsService.createQuery()
            .with('files').where({
                id,
            })
            .one();

        return DataMapper.create(NewsDetailSchema, news);
    }

    @Post('/:id?')
    @ApiOperation({summary: 'Создание новости'})
    @ApiOkResponse({type: NewsSchema})
    async update(
        @Param('id') id: number,
        @Context() context: ContextDto,
        @Body() dto: NewsFormDto,
    ) {
        dto.id = id;
        return this.newsService.createOrUpdate(dto, context)
    }

    @Delete("/:id")
    @ApiOperation({summary: 'Удаление новости'})
    @ApiOkResponse({type: NewsSchema})
    async delete(@Param('id') id: number) {
        const news = await this.newsService.findById(id)

        if (!news) {
            throw new NotFoundException(`News with id ${id} not found`)
        }

        const dto = DataMapper.create<NewsSaveDto>(NewsSaveDto, {
            ...news,
        })

        this.newsService.delete(id);

        return dto;
    }
}