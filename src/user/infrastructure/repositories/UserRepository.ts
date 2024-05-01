import {Injectable} from "@nestjs/common";
import {CrudRepository} from "@steroidsjs/nest/infrastructure/repositories/CrudRepository";
import {IUserRepository} from "src/user/domain/interfaces/IUserRepository";
import {UserModel} from "src/user/domain/models/UserModel";

@Injectable()
export class UserRepository extends CrudRepository<UserModel> implements IUserRepository {
    constructor() {
        super();
    }

    protected modelClass = UserModel;


    async isExists(id: number): Promise<boolean> {
        return this.dbRepository.exist({
            where: {id},
        });
    }
}