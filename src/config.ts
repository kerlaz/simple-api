import dotenv from "dotenv"
import * as process from "process";

dotenv.config()


export type TConfig = {
    port: string | number,
    dbUser: string,
    dbPassword: string,
    dbHost: string,
    testValue: string
}
export const config: TConfig = {
    dbHost: process.env.DB_HOST,
    dbPassword: process.env.DB_PASSWORD,
    dbUser: process.env.DB_USER,
    port: process.env.PORT || 8000,
    testValue: process.env.SOME_TEST_VALUE
}

console.log(config)
