import dotenv from "dotenv";
import router from "./router";
import { client } from "./common";
import Fastify from "fastify";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(router);

client.connect().then(() => {
  const port = Number(process.env.port || 3198);
  fastify.listen({ port }, () => {
    console.log(`listening at port ${port}`);
  });
});
