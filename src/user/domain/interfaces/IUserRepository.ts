import {UserModel} from "../models/UserModel";
import {ICrudRepository} from "@steroidsjs/nest/usecases/interfaces/ICrudRepository";

export const IUserRepository = 'IUserRepository';


export interface IUserRepository extends ICrudRepository<UserModel> {
    isExists(id: number): Promise<boolean>;
}