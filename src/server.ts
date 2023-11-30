import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify({logger: true})

app.listen({
  port: 8080,
  },
  () => console.log("server listening on port 8080")
);