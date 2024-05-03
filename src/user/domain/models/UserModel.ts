import {AuthRoleModel} from "@steroidsjs/nest-auth/domain/models/AuthRoleModel";
import {
    CreateTimeField,
    PasswordField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField,
    UpdateTimeField
} from "@steroidsjs/nest/infrastructure/decorators/fields";
import {UserModel as BaseUserModel} from "@steroidsjs/nest-modules/user/models/UserModel";

export class UserModel extends BaseUserModel {
    @PrimaryKeyField()
    id: number;

    @StringField({
        nullable: false,
    })
    login: string;

    @PasswordField({
        label: 'Хеш пароля',
        nullable: true,
    })
    passwordHash: string;

    @RelationField({
        label: '',
        type: 'ManyToMany',
        isOwningSide: false,
        relationClass: () => AuthRoleModel,
        inverseSide: (role: AuthRoleModel) => role.users,
    })
    authRoles: AuthRoleModel[];

    @RelationIdField({
        nullable: true,
        relationName: 'authRoles',
        isArray: true,
    })
    authRolesIds: number[];

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: string;
}