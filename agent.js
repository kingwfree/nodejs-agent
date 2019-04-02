//https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&word=%E7%8C%AB&pn=30&rn=30
//https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?uin=0&topid=3
const Koa = require('koa');
const request = require('request');
const Router = require('koa-router');
const app = new Koa;
const router = new Router;
const cors = require('@koa/cors');



function httprequest(url) {
    return new Promise((resolve,reject)=>{
        request(url, (error, response, body)=> {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
        })
    })
}
router.get('/topid/:id',async ctx=>{
    let url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?uin=0&topid=';
    
    url += ctx.params.id;
    
    await httprequest(url)
        .then(res=>{
            ctx.body = res;
        })
    
})
router.get('/query/:id',async ctx=>{
    let queryUrl = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=1&n=10&w=';
    const id = encodeURI(ctx.params.id); //转URI编码
    queryUrl += id;
    await httprequest(queryUrl)
        .then(res=>{
            ctx.body = res;
        })
      
})

app.use(cors())
app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3002)