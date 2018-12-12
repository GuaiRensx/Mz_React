//初始化服务器
//通过postman 测试
//安装配件   post数据接受插件
//数据存入文件
//逻辑处理

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const user = require('./router/user.js')
const db = require('./dbconnect.js')
//const cors=require('cors')
//服务器代理
const proxy = require('http-proxy-middleware')

//var server=https.createServer(options).listen(4000)

//请求头解决跨域
app.all('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
//
//	//跨域请求CORS中的预请求
	if(req.method == "OPTIONS") {
		res.send(200);
	} else {
		next();
	}
});
app.use('/dmapi', proxy({
	"target": "https://m.moretickets.com",
	"changeOrigin": true,
	"pathRewrite": {
		'^/dmapi': '/'
	}
})),
app.use('/ymtapi', proxy({
	"target": "http://m.ymatou.com",
	"changeOrigin": true,
	"pathRewrite": {
		'^/ymtapi': '/'
	}
})),
app.use('/mzapi', proxy({
	"target": "http://m.maoyan.com",
	"changeOrigin": true,
	"pathRewrite": {
		'^/mzapi': '/'
	}
})),
app.use('/cityapi', proxy({
	"target": "https://wap.chinaticket.com",
	"changeOrigin": true,
	"pathRewrite": {
		'^/cityapi': '/'
	}
})),

//post参数解析
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.use('/api/user', user)

app.listen(3333, () => {
	console.log('服务器启动')
})