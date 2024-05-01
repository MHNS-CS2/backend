import {Body, Controller, Inject, Post} from "@nestjs/common";
import {ApiBody, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthLoginDto} from '@steroidsjs/nest-auth/domain/dtos/AuthLoginDto';
import {AuthLoginModel} from "@steroidsjs/nest-auth/domain/models/AuthLoginModel";
import {AuthConfirmSchema} from '@steroidsjs/nest-auth/infrastructure/schemas/AuthConfirmSchema';
import {IUserService} from "@steroidsjs/nest-modules/user/services/IUserService";
import {AdminRegistrationFormDto} from "src/auth/domain/dtos/AdminRegistrationFormDto";
import {UserService} from "src/user/domain/services/UserService";
import {AuthService as BaseAuthService} from '@steroidsjs/nest-auth/domain/services/AuthService';
import {AuthService} from "src/auth/domain/services/AuthService";
import {UserModel} from "@steroidsjs/nest-modules/user/models/UserModel";

@ApiTags('Авторизация')
@Controller('/admin/auth')
export class AuthController {

    constructor(
        @Inject(BaseAuthService)
        private authService: AuthService,
        @Inject(IUserService)
        private userService: UserService,
    ) { }

    @Post('/login')
    @ApiOperation({
        summary: 'Авторизация администратора по логину и паролю'
    })
    @ApiBody({type: AuthLoginDto})
    @ApiOkResponse({type: AuthLoginModel})
    async login() {
        return 'test'
    }


    @Post('/registration')
    @ApiOperation({
        summary: 'Регистрация нового администратора'
    })
    //TODo исправить AuthConfirmSchema
    @ApiOkResponse({type: UserModel})
    async registration(@Body() dto: AdminRegistrationFormDto) {
        const admin = await this.authService.registration(dto);

        return admin;
    }
}