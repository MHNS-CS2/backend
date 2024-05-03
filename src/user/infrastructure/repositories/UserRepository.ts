import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@steroidsjs/nest-typeorm";
import {CrudRepository} from "@steroidsjs/nest/infrastructure/repositories/CrudRepository";
import {IUserRepository} from "src/user/domain/interfaces/IUserRepository";
import {UserModel} from "src/user/domain/models/UserModel";
import {UserTable} from "../tables/UserTable";
import {Repository} from "@steroidsjs/typeorm";

@Injectable()
export class UserRepository extends CrudRepository<UserModel> implements IUserRepository {
    constructor(
        @InjectRepository(UserTable)
        public dbRepository: Repository<UserModel>
    ) {
        super();
    }

    protected modelClass = UserModel;

    async isExists(id: number): Promise<boolean> {
        return this.dbRepository.exist({
            where: {id},
        });
    }
}