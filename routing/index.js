
module.exports =  (router) => {
  router.get('/', async function (ctx, next) {
    ctx.state = {
      title: 'HSINPA'
    };

    await ctx.render('index', {title: ctx.state});
  });

}
