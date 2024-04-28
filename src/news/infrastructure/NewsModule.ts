import {Module} from "@steroidsjs/nest/infrastructure/decorators/Module";
import {ModuleHelper} from "@steroidsjs/nest/infrastructure/helpers/ModuleHelper";
import {INewsRepository} from "../domain/interfaces/INewsRepository";
import {NewsRepository} from "./repositories/NewsRepository";
import {NewsService} from "../domain/services/NewsService";

@Module({
    tables: ModuleHelper.importDir(__dirname + '/tables'),
    permissions: null,
    module: () => ({
        controllers: ModuleHelper.importDir(__dirname + '/controllers'),
        providers: [
            {
                provide: INewsRepository,
                useClass: NewsRepository,
            },
            ModuleHelper.provide(NewsService, [
                INewsRepository,
            ])
        ]
    })

})
export class NewsModule {

}