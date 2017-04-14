/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-14 14:59:39
 * @desc:    (描述)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */

var async = require('async');
//记录当前的并发数量
var currentCount = 0;
var urlArr = [];
var baseUrl = 'http:www.dataSourse_'
for(var i=0;i<30;i+=1){
	urlArr.push(baseUrl+i);
}
function fetchUrl(url,callback){
	var delay = parseInt((Math.random() * 10000000) % 2000, 10);
	currentCount+=1;
	console.log('当前的并发数量：'+currentCount+'，正在抓取的url：'+url+",延迟："+delay);
	setTimeout(function(){
		// 进程结束
		currentCount-=1;
		if (callback) {
			callback();
		}
	},delay)
}
async.mapLimit(urlArr,3,function(url,callback){
	fetchUrl(url,callback);
},function(error,res){//整个并发执行完成之后执行的回调函数
	console.log('获取到结果的输出'+res);
});