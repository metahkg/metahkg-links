import { MongoClient } from "mongodb";
import { config } from "./config";

export const client = new MongoClient(config.MONGO_URI);
export const metahkgDomain = config.METAHKG_DOMAIN;
export const db = client.db("metahkg");
export const linksCl = db.collection("links");
