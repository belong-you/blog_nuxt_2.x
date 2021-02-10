const Router = require('koa-router');
const routes = new Router();

const routerList = [
    { url: '/note', route: require('./note') },
]

routerList.forEach(val => {
    routes.use(val.url, val.route.routes());
})

module.exports = routes;