import { metahkgDomain, linksCl } from "../lib/db";
import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { Type, Static } from "@sinclair/typebox";
import { redis } from "../lib/redis";

export default function (
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
    done: (e?: Error) => void
) {
    const paramsSchema = Type.Object({
        id: Type.RegEx(/^[1-9]\d{0,9}|[a-zA-Z\d]{7}$/),
    });

    fastify.get(
        "/:id",
        { schema: { params: paramsSchema } },
        async (req: FastifyRequest<{ Params: Static<typeof paramsSchema> }>, res) => {
            const id = Number(req.params.id) || req.params.id;

            if (typeof id === "number")
                return res.code(301).redirect(`https://${metahkgDomain}/thread/${id}`);

            let url = await redis?.get(id);

            if (!url) {
                url = (await linksCl.findOne({ id }))?.url;
                if (url) redis?.set(id, url, "EX", 1000 * 60 * 60 * 24 * 7);
                else return res.code(404).send({ statusCode: 404, error: "Not found." });
            }

            res.code(301).redirect(`https://${metahkgDomain}${url}`);
        }
    );
    done();
}
