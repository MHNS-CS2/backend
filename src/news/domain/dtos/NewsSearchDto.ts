import {StringField} from "@steroidsjs/nest/infrastructure/decorators/fields";
import {SearchInputDto} from "@steroidsjs/nest/usecases/dtos/SearchInputDto";

export class NewsSearchDto extends SearchInputDto {
    @StringField({
        label: 'id новости',
        nullable: false,
    })
    id: string;
}