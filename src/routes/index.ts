import redirect from "./redirect";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default function (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: (e?: Error) => void
) {
    fastify.register(redirect);
    fastify.get("/", async (req, res) => {
        return res.code(301).redirect("https://gitlab.com/metahkg/metahkg-links");
    });
    done();
}
