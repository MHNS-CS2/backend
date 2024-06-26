import {RestApplication} from '@steroidsjs/nest/infrastructure/applications/rest/RestApplication';
import {Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import baseConfig from '@steroidsjs/nest/infrastructure/applications/rest/config';
import {IRestAppModuleConfig} from '@steroidsjs/nest/infrastructure/applications/rest/IRestAppModuleConfig';
import {UserModule} from './user/infrastructure/UserModule';
import {AuthModule} from './auth/infrastructure/AuthModule';
import {FileModule} from './file/infrastructure/FileModule';
import {NotifierModule} from './notifier/infrastructure/NotifierModule';
import {InitModule} from './init/infrastructure/InitModule';
import {NewsModule} from './news/infrastructure/NewsModule';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';

@Module({
    ...baseConfig,
    config: () => {
        const config: IRestAppModuleConfig = baseConfig.config();

        return {
            ...config,
            name: 'backend',
            title: 'mhns',
            cors: {
                ...config?.cors,
                allowHeaders: [
                    'Origin',
                    'X-Requested-With',
                    'Content-Type',
                    'Accept',
                    'Authorization',
                    'X-CSRF-Token',

                    // For file PUT upload
                    'If-None-Match',
                    'If-Modified-Since',
                    'Cache-Control',
                    'X-Requested-With',
                    'Content-Disposition',
                    'Content-Range',
                ],
                allowDomains: [
                    '127.0.0.1:9991',
                ],
            },
            auth: {
                jwtAccessSecretKey: process.env.AUTH_JWT_ACCESS_SECRET_KEY || (process.env.AUTH_JWT_SECRET_KEY + 'a'),
                jwtRefreshSecretKey: process.env.AUTH_JWT_REFRESH_SECRET_KEY || (process.env.AUTH_JWT_SECRET_KEY + 'r'),
                accessTokenExpiresSec: '7h',
                refreshTokenExpiresSec: '30d',
            },
            database: {
                ...config.database,
                // Раскомментировать для отладки
                // logging: ['schema', 'warn', 'error', 'migration'/*, 'query'/**/],
            },
            sentry: {
                dsn: process.env.APP_SENTRY_DSN,
                environment: process.env.APP_ENVIRONMENT,
            },
        } as IRestAppModuleConfig;
    },
    module: (config: IRestAppModuleConfig) => {
        const module = baseConfig.module(config);
        return {
            ...module,
            imports: [
                AuthModule,
                UserModule,
                FileModule,
                NotifierModule,
                InitModule,
                NewsModule,
                ServeStaticModule.forRoot({
                    rootPath: join(__dirname, '..', '..', 'files', 'uploaded')
                }),
                ...module.imports,
            ],
        };
    },
})
export class AppModule {}

(new RestApplication()).start();
