import Koa, {Context} from "koa"
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import {config} from "./config";
import {readdir, writeFile} from "node:fs/promises"
import {randomUUID} from "node:crypto"
import {ILoginRequest, ILoginResponse} from "@inkoda/my-auth-req-contracts";


const app = new Koa();

// app.use(cors())

app.use(bodyParser())

export const router = new Router();

router.post('/login', async (ctx: Context): Promise<void> => {
    const {login, password} = ctx.body as ILoginRequest;
    // ... auth
    const response: ILoginResponse = {
        success: true,
        message: 'OK!',
        accessToken: 'token',
        refreshToken: 'token'
    }
    ctx.body = response;
})

router.get('/', async (ctx: Context): Promise<void> => {
    ctx.body = {
        success: true,
        payload: {
            message: "Does it work?"
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
router.get('/upload', async (ctx: Context): Promise<void> => {
    const filename = randomUUID();
    try {
        await writeFile(`upload/${filename}.txt`, filename);
        ctx.body = {
            success: true,
            payload: {
                message: await scanDir()
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            success: false,
            payload: {
                message: 'Oops!'
            }
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