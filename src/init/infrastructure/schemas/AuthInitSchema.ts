import {RelationField} from '@steroidsjs/nest/infrastructure/decorators/fields';
import {UserSchema} from '../../../user/domain/dtos/UserSchema';

export class AuthInitSchema {
    @RelationField({
        type: 'OneToOne',
        inverseSide: () => null,
        isOwningSide: true,
        relationClass: () => UserSchema,
    })
    user: UserSchema;
}
