export interface Contacts{
  id: string;
  name: string;
  email: string;
  phone: string;
  user_id?: string;
}
export interface ContactCreate {
  name: string;
  email: string;
  phone: string;
  user_email: string;
}

export interface ContactCreateData {
  name: string;
  email: string;
  phone: string;
  user_id: string;
}

export interface ContactsRepository {
  create(data: ContactCreateData): Promise<Contacts>;
  findByEmailOrPhone(email: string, phone: string): Promise<Contacts | null>;
  findAllContacts(user_id: string): Promise<Contacts[]>;
  updateContacts({ id, name, email, phone }: Contacts): Promise<Contacts>;
  deleteContacts(id: string): Promise<boolean>;
}