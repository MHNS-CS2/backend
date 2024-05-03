import {Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import coreModule from '@steroidsjs/nest-auth';
import {IAuthModuleConfig} from '@steroidsjs/nest-auth/infrastructure/config';
import {ModuleHelper} from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';
import {AuthController as BaseAuthController} from '@steroidsjs/nest-auth/infrastructure/controllers/AuthController';
import {join} from 'path';
import {AuthController} from './controllers/AuthController';
import {AuthService as BaseAuthService} from '@steroidsjs/nest-auth/domain/services/AuthService';
import {AuthService} from '../domain/services/AuthService';
import {IUserService} from '@steroidsjs/nest-modules/user/services/IUserService';
import {ISessionService} from '@steroidsjs/nest-auth/domain/interfaces/ISessionService';
import {AuthLoginService} from '@steroidsjs/nest-auth/domain/services/AuthLoginService';
import {AuthPermissionsService} from '@steroidsjs/nest-auth/domain/services/AuthPermissionsService';
import {AuthRoleService} from '@steroidsjs/nest-auth/domain/services/AuthRoleService';
import permissions from './permissions';

@Module({
    ...coreModule,
    tables: [
        ...coreModule.tables,
        ...ModuleHelper.importDir(join(__dirname, '/tables')),
    ],
    permissions,
    module: (config: IAuthModuleConfig) => {
        const module = coreModule.module(config);
        return {
            ...module,
            imports: [
                ...module.imports, 
            ],
            controllers: [
                ...module.controllers.filter(controller => controller !== BaseAuthController),
                AuthController,
            ],
            providers: [
                ...module.providers.map((provide: any) => {
                    if (provide.provide === BaseAuthService) {
                        return {
                            ...ModuleHelper.provide(AuthService, [
                                IUserService,
                                ISessionService,
                                AuthLoginService,
                                AuthPermissionsService,
                                AuthRoleService,
                            ]),
                            provide: BaseAuthService,
                        }
                    }
                    return provide;
                }),
            ],
        };
    },
})
export class AuthModule {}
