/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-14 08:14:28
 * @desc:    (描述)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var express = require('express');
// 返回一个express实例个app
var app = express();
// 创建一个服务器，并在请求到来的时候通过response对象写出数据
app.get('/', function (req,res){
    res.send('Hello World!');
});
// 标志监听端口3000，目的是标志3000号端口为该服务器专用的通道
app.listen(3000,function(){
    console.log('app is  listening at 3000 port!');
});
