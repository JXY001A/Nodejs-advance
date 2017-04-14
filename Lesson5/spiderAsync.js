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
var cheerIo = require('cheerio');
var superAgent = require('superagent');
var eventProxy = require('eventproxy');
var url = require('url');
//记录当前的并发数量
var currentCount = 0;
var urlArr = [];
var soureData = [];
var baseUrl = 'https://cnodejs.org/';

function fetchUrl(url, callback) {
	currentCount += 1;
	console.log('当前的并发数量：' + currentCount + '，正在抓取的url：' + url);
	superAgent.get(url)
		.end(function(error, res) {
			currentCount-=1;
			var html = res.text;
			var $ = cheerIo.load(html);
			var author = $($('.reply_item .user_avatar img')[0]).attr('title');
			// 得到评论
			var comment = $($('.reply_item .markdown-text > p')[0]).text().trim();
			console.log('[主题地址]:'+url+'\n');
			console.log('[Author]:'+author+'  [评论]'+comment);
		});
}


//
superAgent.get(baseUrl)
	.end(function(error, res) {
		var html = res.text;
		var $ = cheerIo.load(html);
		$('.topic_title_wrapper .topic_title').each(function(index, ele) {
			var $ele = $(ele);
			// 将链接与域名组合起来存储到数组中
			urlArr.push(url.resolve(baseUrl, $ele.attr('href')));
		});
		
		async.mapLimit(urlArr, 3, function(url, callback) {
			console.log(1);
			fetchUrl(url);
			// console.log(data == undefined);
			// console.log('[主题地址]:'+data.url+'\n');
			// 	console.log('[Author]:'+data.commentAuthor+'  [评论]'+data.comment);
			// soureData.push(data);
		}, function(error, res) { //整个并发执行完成之后执行的回调函数
			// console.log('-------------------------------\n');
			// console.log("result"+res);
			// soureData.forEach(function(ele){
				// console.log('[主题地址]:'+ele.url+'\n');
				// console.log('[Author]:'+ele.commentAuthor+'  [评论]'+ele.comment);
			// });
			console.log(res);
		});
	});