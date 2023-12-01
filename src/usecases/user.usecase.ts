import { User, UserCreate, UserRepository } from "../interfaces/user.interfaces";
import { UserRepositoryPrima } from "../repositories/user.repository";

export default class UserUseCase {
  private userRepository: UserRepository
  constructor(){
    this.userRepository = new UserRepositoryPrima()
  }

  async create({name, email}: UserCreate): Promise<User>{

  }

}

