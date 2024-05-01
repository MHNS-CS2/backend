import {IUserRegistrationDto} from "@steroidsjs/nest-modules/user/dtos/IUserRegistrationDto";
import {IntegerField, PasswordField, StringField} from "@steroidsjs/nest/infrastructure/decorators/fields";

export class UserRegistrationDto implements Partial<IUserRegistrationDto> {
    @StringField({
        nullable: false,
    })
    login: string;

    @PasswordField({
        required: true,
    })
    password: string;

    @IntegerField({
        isArray: true,
        nullable: true,
    })
    authRolesIds: number[];
}