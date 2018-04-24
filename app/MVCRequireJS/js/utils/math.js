/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-11-20 23:27:39
 * @version $Id$
 */

 require.config({
	// baseUrl:'',//配置基目录
	paths : {
		'jquery' : 'jquery-1.10.2.min'
	}
});

 define(['jquery'], function($){

 	var sub = function(x,y){
 		return x - y;
 	};
 	var add = function(x,y){
 		console.log($)
		return x + y;
	};
	var mul = function(x,y){
		return x * y;
	};

 	return {
 		add : add,
 		sub : sub,
 		mul : mul
 	}

 })
