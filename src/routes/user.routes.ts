import { FastifyInstance } from "fastify";
import UserUseCase from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interfaces";

export async function userRoutes(fastify: FastifyInstance){
  const userUseCase = new UserUseCase()
  fastify.post<{Body: UserCreate}>('/', (req, reply) => {
    const { name, email } = req.body;
    try{
      const data = userUseCase.create({
        name,
        email,
      })
      reply.send(data);
    }catch(err){
      reply.send(err)
    }
  })

  fastify.get('/', (req, reply) => {
    reply.send({hello: 'world'});
  })
}