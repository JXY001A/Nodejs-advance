/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-14 10:26:38
 * @desc:    实现了异步爬虫
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var cheerIo = require('cheerio');
var superAgent = require('superagent');
var eventProxy = require('eventproxy');
var url = require('url');

var cNodeUrl = 'https://cnodejs.org/';
superAgent.get(cNodeUrl)
	.end(function(error,res){
		if (error) {
			console.log(error);
		}
		var html = res.text;
		var urlArr = [];
		var $ = cheerIo.load(html);
		$('.topic_title_wrapper .topic_title').each(function(index, ele) {
			var $ele = $(ele);
			// 将获取的url数量限制为3个
			if (urlArr.length>2) {
				return;
			}
			// 将链接与域名组合起来存储到数组中
			urlArr.push(url.resolve(cNodeUrl,$ele.attr('href')));
		});

		ep = new eventProxy();
		// 注册topic_html事件，指明事件的个数
		ep.after('topic_html',urlArr.length,function(topics){
			var topics = topics.map(function(ele){
				var topicUrl = ele[0];
				// 解析接收到的数据
				var $ = cheerIo.load(ele[1]);
				// 得到评论的作者
				var author =$($('.reply_item .user_avatar img')[0]).attr('title');
				// 得到评论
				var comment = $($('.reply_item .markdown-text > p')[0]).text().trim();

				return {
					topicUrl:topicUrl,
					commentAuthor:author,
					comment:comment
				};
			});
			// 打印结果
			topics.forEach(function (ele){
				console.log(ele.topicUrl);
				console.log(ele.commentAuthor+':'+ele.comment+'\n');
			});
		});
		urlArr.forEach(function (href){
			superAgent.get(href)
				.end(function(error,res){
					if (error) {
						console.log(error);
					}
					console.log(href+'链接的数据获取成功！');
					// 将获取成功的数据发送个topic_html事件注册时的回调函数
					ep.emit('topic_html',[href,res.text]);
				});
		});

	});
