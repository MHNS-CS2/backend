import {ISessionService} from '@steroidsjs/nest-auth/domain/interfaces/ISessionService';
import {AuthLoginService} from '@steroidsjs/nest-auth/domain/services/AuthLoginService';
import {AuthRoleService} from '@steroidsjs/nest-auth/domain/services/AuthRoleService';
import {IUserService} from '@steroidsjs/nest-modules/user/services/IUserService';
import {IValidator} from '@steroidsjs/nest/usecases/interfaces/IValidator';
import {AdminRegistrationFormDto} from '../dtos/AdminRegistrationFormDto';
import SearchQuery from '@steroidsjs/nest/usecases/base/SearchQuery';
import {AuthRoleModel} from '@steroidsjs/nest-auth/domain/models/AuthRoleModel';
import {DataMapper} from '@steroidsjs/nest/usecases/helpers/DataMapper';
import {UserRegistrationDto} from 'src/user/domain/dtos/UserRegistrationDto';
import {AuthTokenPayloadDto} from '@steroidsjs/nest-auth/domain/dtos/AuthTokenPayloadDto';
import {UserModel} from 'src/user/domain/models/UserModel';

export class AuthService {
    constructor(
        private usersService: IUserService,
        /** @see SessionService **/
        private sessionService: ISessionService,
        private authLoginService: AuthLoginService,
        private authRoleService: AuthRoleService,
        public validators: IValidator[],
    ) {
    }

    createTokenPayload(user: UserModel): AuthTokenPayloadDto {
        const dto = new AuthTokenPayloadDto();
        dto.id = user.id;
        return dto;
    }

    async registration(dto: AdminRegistrationFormDto) {
        const registrationDto = DataMapper.create(UserRegistrationDto, {
            ...dto,
        })

        const user = await this.usersService.registration(registrationDto)

        await this.authLoginService.create(user, this.createTokenPayload(user as any));
        return user;
    }
}