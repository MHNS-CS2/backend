import BaseEnum from '@steroidsjs/nest/domain/base/BaseEnum';

export class AuthRolesEnum extends BaseEnum {
    static ADMIN = 'admin';
    static SUPER_ADMIN = 'super_admin'

    static getLabels() {
        return {
            [this.ADMIN]: 'Администратор',
            [this.SUPER_ADMIN]: 'Супер администратор',
        };
    }
}
