var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/54';

function filterChapters(html){
	// courseData = [
	// {
	// 		chapterTitle:'',
	// 		video:[{title:'',id:''},……]
	// 	},
	// ……];
	var courseData = [];
	var $ = cheerio.load(html);
	var chapters = $('.chapter ');
	chapters.each(function(index, el) {
		// chapters={
		// 	chapterTitle:'',
		// 	video:[{title:'',id:''},……]
		// }
		var chapertData={};

		$(this).find('.chapter-content').remove();
		var chapertTitle = $(this).find('strong').text();
		chapertData.chapertTitle = chapertTitle.trim();

		var videoArr = [];
		var videos = $(this).find('.video').children('li');
		videos.each(function(index, el) {
			var videoHref = $(this).find('.J-media-item');
			var videoId = videoHref.attr('href').split('/video')[1];
			var videoTitile = videoHref.text().split('(')[0].trim();
			var videoData ={
				id:videoId,
				title:videoTitile
			};
			videoArr.push(videoData);
		});
		chapertData.video=videoArr;
		courseData.push(chapertData);
	});

	return courseData;
}

function resolveCourseData (courseData){

	courseData.forEach(function(chapter){
		console.log(chapter.chapertTitle);
		chapter.video.forEach(function (video){
			console.log('【'+video.title+'】'+video.id + '\n');			
		});
	});
}

http.get(url,function(res){
	var html = '';
	res.on('data',function(data){
		html+=data;
	});
	res.on('end',function (){
		var courseData = filterChapters(html);
		resolveCourseData(courseData);
	});
}).on('errot',function (){
	console.log("获取慕课网数据出错");
});