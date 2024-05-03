import {ExtendField} from '@steroidsjs/nest/infrastructure/decorators/fields/ExtendField';
import {AuthRoleModel} from '@steroidsjs/nest-auth/domain/models/AuthRoleModel';
import {FileModel} from '@steroidsjs/nest-file/domain/models/FileModel';
import {UserModel} from '../models/UserModel';

export class UserSchema {
    @ExtendField(UserModel)
    id: number;

    @ExtendField(UserModel)
    authRoles: AuthRoleModel[];

    @ExtendField(UserModel)
    createTime: string;

    @ExtendField(UserModel)
    updateTime: string;
}
