const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const path = require('path')
const rootRouter = require('./routing');

const Router = require('koa-router');
const router = new Router();
const views = require('koa-views');
const env = process.env;

const app = new Koa();

app.use(static(
  path.join( __dirname,  '/views')
));

app.use(views(__dirname + '/views', {
  map: {
    html: 'handlebars'
  }
}));

app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods())

var server = http.Server(app.callback());
var io = require('./script/socket/main').listen(server);

rootRouter(router);

//"192.168.0.86"
server.listen(env.NODE_PORT || 3010, '192.168.1.190', function () {
  console.log(`Application worker ${process.pid} started...`);
});
