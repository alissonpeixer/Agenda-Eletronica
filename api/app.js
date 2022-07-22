import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import {router} from "./routes/routes.js"
export const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());