import {Injectable} from "@nestjs/common";
import {CrudService} from "@steroidsjs/nest/usecases/services/CrudService";
import {UserModel} from "../models/UserModel";
import {UserSearchDto} from "../dtos/UserSearchDto";
import {IUserRepository} from "../interfaces/IUserRepository";
import {ISessionService} from "@steroidsjs/nest-auth/domain/interfaces/ISessionService";
import {AdminRegistrationFormDto} from "src/auth/domain/dtos/AdminRegistrationFormDto";
import {DataMapper} from "@steroidsjs/nest/usecases/helpers/DataMapper";

@Injectable()
export class UserService extends CrudService<UserModel, UserSearchDto, UserModel> {
    protected modelClass = UserModel;

    constructor(
        public repository: IUserRepository,
        public session: ISessionService,
    ) {
        super();
    }


    async registration(dto: AdminRegistrationFormDto): Promise<UserModel> {
        const model = DataMapper.create(UserModel, dto);

        if (dto.password) {
            model.passwordHash = await this.session.hashPassword(dto.password);
        }

        return this.create(model);
    }
}