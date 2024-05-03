import {IntegerField, StringField} from "@steroidsjs/nest/infrastructure/decorators/fields";

export class AdminRegistrationFormDto {
    @StringField({
        required: true,
        label: 'Логин'
    })
    login: string;

    @StringField({
        required: true,
        label: 'Пароль'
    })
    password: string;

    @IntegerField({
        isArray: true,
        nullable: true,
    })
    authRolesIds: number[];
}