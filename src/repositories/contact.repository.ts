import { prisma } from "../database/prisma-client";
import { ContactCreate, ContactCreateData, Contacts, ContactsRepository } from "../interfaces/contacts.interface";

export class ContactsRepositoryPrisma implements ContactsRepository {
  async create(data: ContactCreateData): Promise<Contacts> {
    const result = await prisma.contacts.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        user_id: data.user_id
      }
    })
    return result;
  }
  async findByEmailOrPhone(email: string, phone: string): Promise<Contacts | null>{
    const result = await prisma.contacts.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            phone,
          },
        ],
      },
    });
    return result || null;
  }
  async findAllContacts(user_id: string): Promise<Contacts[]>{
    const result = await prisma.contacts.findMany({
      where:{
        user_id,
      }
    })
    return result;
  }
}
