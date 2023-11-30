import { User, UserCreate, UserRepository } from "../interfaces/user.interfaces";

class UserRepositoryPrima implements UserRepository{
  async create(data: UserCreate): Promise<User> {
    
  }
}

export {UserRepositoryPrima}