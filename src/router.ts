import { Router } from "express";
import redirect from "./router/redirect";
const router = Router();
router.use(redirect);
export default router;
