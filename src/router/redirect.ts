import { Router } from "express";
import { metahkgDomain, linksCl } from "../common";
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
    res.redirect(301, `https://${metahkgDomain}/thread/${id}`);
    return;
  }
  const url = (await linksCl.findOne({ id: id }))?.url;
  if (!url) {
    res.status(404);
    res.send({ error: "Not found." });
    return;
  }
  res.redirect(301, `https://${metahkgDomain}${url}`);
});
export default router;
