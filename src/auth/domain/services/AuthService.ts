import {ISessionService} from '@steroidsjs/nest-auth/domain/interfaces/ISessionService';
import {AuthLoginService} from '@steroidsjs/nest-auth/domain/services/AuthLoginService';
import {AuthRoleService} from '@steroidsjs/nest-auth/domain/services/AuthRoleService';
import {IValidator} from '@steroidsjs/nest/usecases/interfaces/IValidator';
import {AdminRegistrationFormDto} from '../dtos/AdminRegistrationFormDto';
import {DataMapper} from '@steroidsjs/nest/usecases/helpers/DataMapper';
import {UserRegistrationDto} from 'src/user/domain/dtos/UserRegistrationDto';
import {AuthTokenPayloadDto} from '@steroidsjs/nest-auth/domain/dtos/AuthTokenPayloadDto';
import {UserModel} from 'src/user/domain/models/UserModel';
import {IUserService} from '@steroidsjs/nest-modules/user/services/IUserService';
import {AuthLoginDto} from '@steroidsjs/nest-auth/domain/dtos/AuthLoginDto';
import {UnauthorizedException} from '@steroidsjs/nest/usecases/exceptions';
import {AuthUserDto} from '@steroidsjs/nest-auth/domain/dtos/AuthUserDto';
import {AuthPermissionsService} from '@steroidsjs/nest-auth/domain/services/AuthPermissionsService';
import {ModuleHelper} from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';
import {IAuthModuleConfig} from '@steroidsjs/nest-auth/infrastructure/config';
import {AuthModule} from '@steroidsjs/nest-modules/auth/AuthModule';
import JwtTokenStatusEnum from '@steroidsjs/nest-auth/domain/enums/JwtTokenStatusEnum';


export class AuthService {
    constructor(
        private usersService: IUserService,
        /** @see SessionService **/
        private sessionService: ISessionService,
        private authLoginService: AuthLoginService,
        private authPermissionsService: AuthPermissionsService,
        public validators: IValidator[],
    ) {
    }

    createTokenPayload(user: UserModel): AuthTokenPayloadDto {
        const dto = new AuthTokenPayloadDto();
        dto.id = user.id;
        return dto;
    }


    async login(dto: AuthLoginDto) {
        const user = await this.usersService.createQuery()
            .with('authRoles')
            .where({login: dto.login}).one();

        if (!user) {
            throw new UnauthorizedException('Пользователь не найден')
        }


        const authLogin = await this.authLoginService.create(user, this.createTokenPayload(user));
        authLogin.user.authRoles = user.authRoles.map(authRole => authRole.name)

        return authLogin;
    }

    async registration(dto: AdminRegistrationFormDto) {
        const registrationDto = DataMapper.create(UserRegistrationDto, {
            ...dto,
            authRolesIds: [1],
        })

        const user = await this.usersService.registration(registrationDto)

        await this.authLoginService.create(user, this.createTokenPayload(user as any));
        return user;
    }


    async refreshToken(refreshToken: string) {
        const {payload, status} = await this.sessionService.verifyToken(refreshToken, {
            secret: ModuleHelper.getConfig<IAuthModuleConfig>(AuthModule).jwtRefreshSecretKey
        })
        if (status === JwtTokenStatusEnum.VALID && payload) {
            const authLogin = await this.authLoginService.findByUid(payload.jti);
            if (authLogin && !authLogin.isRevoked) {
                const user = await this.usersService.findById(payload.sub);

                authLogin.accessToken = await this.authLoginService.generateAccessToken(
                    user,
                    this.createTokenPayload(user),
                    payload.jti,
                );
                return authLogin;
            }
        }
        throw new UnauthorizedException('Неверный refresh токен авторизации');
    }

    async createAuthUserDto(payload: AuthTokenPayloadDto): Promise<AuthUserDto> {
        const user = await this.usersService.createQuery()
            .with('authRolesIds')
            .where({id: payload.id})
            .one();

        const permissions = await this.authPermissionsService.getRolesPermissions(user, user?.authRolesIds || []);

        const dto = new AuthUserDto();
        dto.id = payload.id;
        dto.permissions = permissions;

        return dto;
    }
}