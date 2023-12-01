import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";

const app: FastifyInstance = fastify({logger: true})

app.register(userRoutes, {
  prefix: "/users"
})

app.listen({
  port: 8080,
  },
  () => console.log("server listening on port 8080")
);
