import { FastifyInstance } from "fastify";
import UserUseCase from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interfaces";
import { ContactUseCase } from "../usecases/contact.usecase";
import { ContactCreate } from "../interfaces/contacts.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactRoutes(fastify: FastifyInstance){
  const contactUseCase = new ContactUseCase();
  fastify.addHook("preHandler", authMiddleware )
  fastify.post<{Body: ContactCreate}>('/', async (req, reply) => {
    const { name, email, phone } = req.body;
    const emailUser = req.headers["email"]
    try{
      const data = await contactUseCase.create({
        name,
        email,
        phone,
        user_email: emailUser,
      })
      reply.send(data);
    }catch(err){
      reply.send(err)
    }
  });

  fastify.get('/', async (req, reply) =>{
    const emailUser = req.headers["email"]
    try {
      const data = await contactUseCase.listAllContact(emailUser);
      return reply.send(data);
    } catch (error){
      reply.send(error)
    }
    
  });

  fastify.put<{Body: ContactCreate, Params: {id: string}}>('/:id', async (req,replay)=>{
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
      const data = await contactUseCase.updateContacts({id, name, email, phone});
      return replay.send(data);
    } catch (error){
      replay.send(error)
    }
  })

  fastify.delete<{Params: {id: string}}>('/:id', async (req,replay)=>{
    const { id } = req.params;
    try {
      const data = await contactUseCase.deleteContacts(id);
      return replay.send(data);
    } catch (error){
      replay.send(error)
    }
  })

}