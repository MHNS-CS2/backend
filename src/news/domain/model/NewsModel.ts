import {CreateTimeField, PrimaryKeyField, RelationField, RelationIdField, TextField, UpdateTimeField, } from "@steroidsjs/nest/infrastructure/decorators/fields";
import {FileModel} from "@steroidsjs/nest/infrastructure/tests/app/models/FileModel";

export class NewsModel {
    @PrimaryKeyField()
    id: number;

    @TextField({
        label: 'Название новости'
    })
    title: string;

    @TextField({
        label: 'Описание новости'
    })
    description: string;

    @RelationField({
        type: 'ManyToMany',
        relationClass: () => FileModel,
        isOwningSide: true,
    })
    files: FileModel[];

    @RelationIdField({
        nullable: true,
        relationName: 'files',
        isArray: true,
        isFieldValidConstraintMessage: 'Необходимо загрузить файл',
        label: 'Файлы',
    })
    filesIds: number[];

    @CreateTimeField({
        label: 'Создана',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлена',
    })
    updateTime: string;
}