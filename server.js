const koa = require('koa');
const app = new koa();
const http = require('http');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const server = http.createServer(app.callback());

const Router = require('@koa/router');
const router = new Router();
router.use('/api', require('./routes/config').routes());

app.use(async (ctx, next) => {

    await next();  // koa 支持等待 next 函数
    const body = ctx.body;

	// 等待所有中间件完成后执行
    ctx.body = {
        code: 200,
        msg: '',
        data: body
    }
});
app.use(router.routes());

app.use(bodyParser());
app.use(cors({
    credentials: true,
}));  // 允许跨域

server.listen(5008, () => {
    console.log('服务已启动...');
})