import Koa, {Context} from "koa"
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import {config} from "./config";
import {readdir, stat} from "node:fs/promises"

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
router.get("/list", async (ctx: Context): Promise<void> => {
    console.log('TEST');
    const data = await scanDir();
    console.log(data);
    ctx.body = {
        success: true,
        payload: {
            message: data
        }
    }
})

app.use(router.routes())

app.use(router.allowedMethods())

// test dir creation
export const scanDir = async (): Promise<string[] | string> => {
    try {
        const files = await readdir("upload");
        return files.length > 0 ? files : "directory is empty";
    } catch (e) {
        console.log(e);
        return e.message;
    }
}
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});