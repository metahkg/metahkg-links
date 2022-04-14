import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
export const mongouri = process.env.mongouri || "mongodb://localhost";
export const client = new MongoClient(mongouri);
export const metahkgOrigin = process.env.metahkgOrigin || "https://metahkg.org";
export const db = client.db("metahkg");
export const linksCl = db.collection("links");
