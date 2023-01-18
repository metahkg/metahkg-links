import dotenv from "dotenv";
dotenv.config();

export const config = {
    PORT: Number(process.env.PORT || process.env.port || 3000) || 3000,
    MONGO_URI: process.env.MONGO_URI || process.env.DB_URI || "mongodb://localhost",
    METAHKG_DOMAIN:
        process.env.METAHKG_DOMAIN || process.env.metahkgDomain || "metahkg.org",
    REDIS_HOST: process.env.REDIS_HOST || "",
    REDIS_PORT: Number(process.env.REDIS_PORT || 6379) || 6379,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
};
