import redirect from "./redirect";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default function (
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
    done: (e?: Error) => void
) {
    fastify.register(redirect);
    fastify.get("/", (_req, res) => {
        return res.code(301).redirect("https://gitlab.com/metahkg/metahkg-links");
    });
    done();
}
