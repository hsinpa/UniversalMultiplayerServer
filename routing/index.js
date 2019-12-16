const ip = require("ip");

module.exports =  (router) => {
  router.get('/', async function (ctx, next) {
    ctx.state = {
      title: 'HSINPA',
      ip : ip.address()
    };

    await ctx.render('index', {title: "HSINPA"});
  });


  router.get('/ip', async function (ctx, next) {
     ctx.body = ip.address();
  });

}
