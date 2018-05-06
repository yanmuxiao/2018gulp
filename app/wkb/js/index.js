
// 左上角返回
$('.head-left .icon-left1').click(function() {
	window.history.go(-1);
});

$('.foot-box-list a').each(function(){
	util.toucher(this).on('singleTap', function(){
		if($(this).data('href') && !$(this).hasClass('foot-box-cur')) {
			window.location.href = $(this).data('href');
			return false;
		}else{
			return;
		}
	})
})


// $('.RUI-listview').on('click', 'li', function(){
// 	window.location.href = $(this).data('url');
// })

$('.RUI-listview li').each(function(){
	util.toucher(this).on('singleTap', function(){
		if($(this).data('url')) {
			window.location.href = $(this).data('url');
			return false;
		}else{
			return;
		}
	})
})