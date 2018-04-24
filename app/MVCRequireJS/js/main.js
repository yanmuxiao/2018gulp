/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-11-20 19:41:51
 * @version $Id$
 */

// 成功实现

/* 注意事项：
		1、相同模块多次依赖引入不会重复加载；
*/

require.config({
	// baseUrl:'',//配置基目录
	paths : {
		'jquery' : 'jquery-1.10.2.min'
	}
});

require(['jquery','utils/math'],function($,math){

	$('#confirmId1').click(function() {
		$('.demo').css({
			"background-color" : "#f00",
			'color' : "#fff",
			'font-size' : '20px'
		}).html(math.mul(10,2));
	})

});

require(['jquery','utils/math','utils/modules'],function($,math,modules){

	$('#confirmId2').click(function() {
		$('.demo').css({
			"background-color" : "#ff0",
			'color' : "#000",
			'font-size' : '20px'
		}).html(math.add(10,2));
	})
	console.log(modules.module)

});