var navs = [{
	name: "基本元素",
	icon: "appreciate",
	subMenu: true,
	href: 'button1.html',
	children: [{
		name: "按钮",
		icon: "&#xe641",
		subMenu: false,
		href: "button.html"
	}, {
		name: "表单",
		icon: "&#xe641",
		subMenu: false,
		href: "form.html"
	}]
},{
	name: "基本元素1",
	icon: "appreciate",
	subMenu: true,
	href: 'button2.html',
	children: [{
		name: "按钮",
		icon: "&#xe641",
		subMenu: false,
		href: "button.html"
	}, {
		name: "表单",
		icon: "&#xe641",
		subMenu: false,
		href: "form.html"
	}]
}];

var allHtml = '';
$.each(navs, function(index, value) {
	var h = '<ul class="layout-ul-0">';
	var f = '</ul>';
	if(value.subMenu && false) {
		var c = '<li  class="layout-li-0">' +
		'<a href="javascript:;" data-url="' + value.href + '"><icon class="iconfont icon-' + value.icon + '"></icon>' + value.name + '</a href="javascript:;">' +
		'</li>';
	}else{
		var c = '<li  class="layout-li-0">' +
		'<a href="javascript:;" data-url="' + value.href + '"><icon class="iconfont icon-' + value.icon + '"></icon>' + value.name + '</a href="javascript:;">' +
		'</li>';
	}
	var hcf = h + c + f;
	allHtml += hcf;
	// var html = '<li  class="layout-li-0">' +
	// 	'<a href="javascript:;"><icon class="iconfont icon-appreciate"></icon>基本元素</a href="javascript:;">' +
	// 	'<ul class="layout-ul-1">' +
	// 		'<li class="layout-li-1">' +
	// 			'<a href="javascript:;"><icon class="iconfont icon-appreciate"></icon>基本元素1-1</a>' +
	// 			'<ul class="layout-ul-2">' +
	// 				'<li class="layout-li-2"><a href="javascript:;"><icon class="iconfont icon-appreciate"></icon>基本元素1-1</a></li>' +
	// 			'</ul>' +
	// 		'</li>' +
	// 		'<li class="layout-li-1"><a href="javascript:;"><icon class="iconfont icon-appreciate"></icon>基本元素1-2</a></li>' +
	// 	'</ul>' +
	// '</li>';
})
$('#layoutAside').html(allHtml)