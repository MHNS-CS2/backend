import {Body, Controller, Inject, Post, UseGuards} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {ContextDto} from '@steroidsjs/nest/usecases/dtos/ContextDto';
import {Context} from '@steroidsjs/nest/infrastructure/decorators/Context';
import {AuthInitSchema} from '../schemas/AuthInitSchema';
import getExportedEnums from '../helpers/getExportedEnums';
import {InitRequestDto} from '../../usecases/dtos/InitRequestDto';
import {exportEnums} from '../helpers/entitiesExporter';
import {JwtAuthGuard} from '@steroidsjs/nest-auth/infrastructure/guards/JwtAuthGuard';
import {IUserService} from '@steroidsjs/nest-modules/user/services/IUserService';
import {UserService} from 'src/user/domain/services/UserService';
import SearchQuery from '@steroidsjs/nest/usecases/base/SearchQuery';
import {UserModel} from 'src/user/domain/models/UserModel';
import {AuthPermissionsService} from '@steroidsjs/nest-auth/domain/services/AuthPermissionsService';
import {AuthService as BaseAuthService} from '@steroidsjs/nest-auth/domain/services/AuthService';
import {AuthService} from '../../../auth/domain/services/AuthService';

@ApiTags('Init')
@Controller()
export class InitController {
    constructor(
        @Inject(IUserService)
        private userService: UserService,
        private authPermissionsService: AuthPermissionsService,
        @Inject(BaseAuthService)
        private authService: AuthService,
    ) {}

    @Post('/init-admin')
    @ApiOperation({summary: 'Инициализация данных для админ панели.'})
    @ApiOkResponse({type: AuthInitSchema})
    @UseGuards(JwtAuthGuard)
    async initAdmin(
        @Context() context: ContextDto,
    ) {
        const contextUserId = context.user?.id;

        const user = contextUserId
            ? await this.userService.findOne(
                (new SearchQuery<UserModel>())
                    .with('authRoles')
                    .with('authPermissions')
                    .where({id: contextUserId})
            ) : null

        if (!user) {
            return {
                user: null,
                meta: {},
            };
        }

        const resultData = {
            user: {
                ...user
                    ? {
                        ...user,
                        authRoles: user.authRoles.map(authRole => authRole.name),
                        roles: await this.authPermissionsService.getRolesPermissions(
                            user,
                            user.authRoles.map(authRole => authRole.id),
                        ),
                    }
                    : null,
            },
            meta: {},
        }

        return resultData;
    }
}
