/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-14 08:36:54
 * @desc:    (描述)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
 var express = require('express');
 var utility = require('utility');

 var app = express();

 app.get('',function (req,res){
 	 // 从 req.query 中取出我们的 q 参数。
 	var q = req.query.q;
 	// 将传递过来的数据q使用MD5算法加密
 	var md5Value = utility.md5(q);
 	// 将加密完成的数据响应出去
 	res.send(md5Value);
 });
app.listen(3000,function(){
	console.log('app is runing at 3000 prot');
});