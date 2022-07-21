import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";


const app = new Koa();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());
app.use(cors());

router.get('/', ctx =>{
  ctx.body = "awdawdawdawdd"
})

app.listen(9901, () => console.log('Server Rodando!'))
