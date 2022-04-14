import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
export const mongouri = process.env.DB_URI || "mongodb://localhost";
export const client = new MongoClient(mongouri);
export const metahkgDomain = process.env.metahkgDomain || "metahkg.org";
export const db = client.db("metahkg");
export const linksCl = db.collection("links");
