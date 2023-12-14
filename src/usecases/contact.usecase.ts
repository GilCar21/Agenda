import { ContactCreate, Contacts, ContactsRepository } from "../interfaces/contacts.interface";
import { UserRepository } from "../interfaces/user.interfaces";
import { ContactsRepositoryPrisma } from "../repositories/contact.repository";
import { UserRepositoryPrima } from "../repositories/user.repository";

export class ContactUseCase {
  private contactRepository: ContactsRepository;
  private userRepository: UserRepository;
  constructor(){
    this.contactRepository = new ContactsRepositoryPrisma()
    this.userRepository = new UserRepositoryPrima()
  }
  async create ({email, name, phone, user_email}: ContactCreate){
    const user = await this.userRepository.findByEmail(user_email)
    if(!user){
      throw new Error(`User not found`)
    }

    const verifyIfExistSContact = await this.contactRepository.findByEmailOrPhone(email, phone)

    if(verifyIfExistSContact){
      throw new Error("contact already exists")
    }

    const contact = await this.contactRepository.create({
      email,
      name,
      phone,
      user_id: user.id,
    })
    return contact;
  }
  async listAllContact (user_email: string){
    const user = await this.userRepository.findByEmail(user_email);
    if(!user){
      throw new Error("user not found")
    }

    const contacts = await this.contactRepository.findAllContacts(user.id);

    return contacts
  }

  async updateContacts({ id, name, email, phone }: Contacts){
    const data = await this.contactRepository.updateContacts({id, name, email, phone})
    return data;
  }

  async deleteContacts(id: string){
    const data = await this.contactRepository.deleteContacts(id)
    return data;
  }
}