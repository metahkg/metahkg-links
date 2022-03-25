import { Router } from "express";
import { metahkgOrigin, client } from "../common";
import isInteger from "is-sn-integer";
const router = Router();
router.get("/:id", async (req, res) => {
  if (
    typeof req.params.id !== "string" ||
    (req.params.id.length !== 7 && !isInteger(req.params.id))
  ) {
    res.status(400);
    res.send({ error: "Bad request." });
    return;
  }
  const id = Number(req.params.id) || req.params.id;
  if (typeof id === "number") {
    res.redirect(301, `${metahkgOrigin}/thread/${id}`);
    return;
  }
  const links = client.db("metahkg-links").collection("links");
  const url = (await links.findOne({ id: id }))?.url;
  if (!url) {
    res.status(404);
    res.send({ error: "Not found." });
    return;
  }
  res.redirect(301, `${metahkgOrigin}${url}`);
});
export default router;
