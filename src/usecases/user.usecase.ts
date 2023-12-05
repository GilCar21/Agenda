import { User, UserCreate, UserRepository } from "../interfaces/user.interfaces";
import { UserRepositoryPrima } from "../repositories/user.repository";

export default class UserUseCase {
  private userRepository: UserRepository
  constructor(){
    this.userRepository = new UserRepositoryPrima()
  }

  async create({name, email}: UserCreate): Promise<User>{
    const verifyIfUserAlreadyExists = await this.userRepository.findByEmail(email)
    if(verifyIfUserAlreadyExists){
      throw new Error(`User ${name} already exists`)
    }
    const result = await this.userRepository.create({name, email});

    return result;
  }

}

