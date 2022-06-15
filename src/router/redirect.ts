import { metahkgDomain, linksCl } from "../common";
import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { Type } from "@sinclair/typebox";
import { ajv } from "../lib/ajv";

export default function (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: (e?: Error) => void
) {
    fastify.get("/:id", async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
        const id = Number(req.params.id) || req.params.id;

        const schema = Type.Union([
            Type.Integer({ minimum: 1 }),
            Type.String({ minLength: 7, maxLength: 7 }),
        ]);

        if (!ajv.validate(schema, id))
            return res.code(400).send({ error: "Bad request." });

        if (typeof id === "number")
            return res.code(301).redirect(`https://${metahkgDomain}/thread/${id}`);

        const url = (await linksCl.findOne({ id: id }))?.url;

        if (!url) return res.code(404).send({ error: "Not found." });

        res.code(301).redirect(`https://${metahkgDomain}${url}`);
    });
    done();
}
