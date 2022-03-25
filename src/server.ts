import express from "express";
import dotenv from "dotenv";
import router from "./router";
import { client } from "./common";
dotenv.config();
const app = express();
client.connect();
app.disable("x-powered-by");
app.use(router);
const port = process.env.port || 3198;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
