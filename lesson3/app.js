/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-14 09:11:23
 * @desc:    (描述)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
var cheerIo = require('cheerio');
var superAgent = require('superagent');
var express = require('express');

var app = express();
app.get('/', function(req, res) {
    superAgent.get('https://cnodejs.org/')
        .end(function(error, sres) {
            if (error) {
                next(err);
            }
            // 获取请求到的html文本
            var html = sres.text;
            var $ = cheerIo.load(html);
            var items = [];
            $('.topic_title_wrapper .topic_title').each(function(indes) {
                var $ele = $(this);
                var title = $ele.text().trim();
                var href = $ele.attr('href');
                var itemData = {
                    title: title,
                    href: href
                };
                items.push(itemData);
            });
		    // 将爬到的数据响应出去
		    res.send(items);
        });;
});

app.listen(3000, function() {
    console.log('app is running at 3000 port');
});
