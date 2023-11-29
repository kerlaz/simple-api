import Koa, {Context} from "koa"
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import {config} from "./config";

const app = new Koa();

// app.use(cors())

app.use(bodyParser())

export const router = new Router();

router.get('/', async (ctx: Context): Promise<void> => {
    ctx.body = {
        success: true,
        payload: {
            message: "Hello Anonymous!"
        }
    }
})

router.get('/user', async (ctx: Context): Promise<void> => {
    ctx.body = {
        success: true,
        payload: {
            message: "Hello from other instance of user service!"
        }
    }
})

app.use(router.routes())

app.use(router.allowedMethods())

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});