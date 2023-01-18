import routes from "./routes";
import { client } from "./lib/db";
import Fastify from "fastify";
import fastifyRateLimit from "@fastify/rate-limit";
import { ajv } from "./lib/ajv";
import { config } from "./lib/config";
import { redis } from "./lib/redis";

const fastify = Fastify({
    logger: true,
    trustProxy: true,
    maxParamLength: 10,
});

fastify.setValidatorCompiler((opt) => ajv.compile(opt));

fastify.register(fastifyRateLimit, {
    global: true,
    max: 100,
    ban: 20,
    timeWindow: 1000 * 60,
    ...(redis && { redis }),
});

fastify.register(routes);

client.connect().then(() => {
    const port = config.PORT;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fastify.listen({ port, host: "0.0.0.0" }, () => {});
});
