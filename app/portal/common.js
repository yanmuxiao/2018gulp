/**
 * @Author fenghuixia
 * @version 2017-06-13
 * @description 显示隐藏左右iframe
 */

$(function () {
    headerMore();
})

//控制滑动左侧的iframe
function animateLeftFrameIn(url, mapType, menuTarget, asideMuneId, asideMuneName){
	// var $slideFrameLeftDiv = $('#leftMainDiv'),
	// 	$slideFrame = $('#leftMainDiv>iframe');
	
	// $(".iframeContent").addClass("hide");
	// $(".iframeContent").not($("#controlMainContent")).find("iframe").attr("src",'');
	// $slideFrameLeftDiv.removeClass("hide");
	// /*$slideFrame.attr('src',url);*/
	// if(mapType == 'jsMap'){
	// 	$slideFrame.attr('src','/portal/page/tacticsFrameJs.html?pageUrl='+url);
	// }else{
	// 	$slideFrame.attr('src','/portal/page/tacticsFrame.html?pageUrl='+url);
	// }

	if(!asideMuneId) {
		var activeLiA = $('.dropdown-menu li.active a');
		asideMuneId = activeLiA.attr('asidemuneid') || activeLiA.attr("ui-permission");
		asideMuneName = activeLiA.text();
		menuTarget = activeLiA.attr('href');
	}

	// vehiclecloud模块使用独立的jsMap
	var mapTypeSrc = '/portal/page/tacticsFrame.html?pageUrl=' + url;
	if(mapType == 'jsMap'){
		var locationHref = window.location.href;
		// if(locationHref.indexOf('datadefenceMenu.html') >= 0) {
		// 	moduleType = '/datadefence'
		// }else if(locationHref.indexOf('efacecloudMenu.html') >= 0) {
		// 	moduleType = '/efacecloud'
		// }else 
		if(locationHref.indexOf('vehiclecloudMenu.html') >= 0) {
			var moduleType = '/vehiclecloud'
			mapTypeSrc = moduleType + '/page/technicalStation/technicalCommonMap/tacticsFrameJs.html?pageUrl=' + url;
		}else{
			mapTypeSrc = '/portal/page/tacticsFrameJs.html?pageUrl=' + url;
		}
		
	}



	var iframeHad = false;
	$('#openIframeList li').each(function(index, val) {
		if($(this).attr('asideMuneId') === asideMuneId) {
			$('#openIframeList li').removeClass('active');
			$(this).addClass('active');
			$('#' + $(this).attr('asidemuneid')).removeClass('hide');
			iframeHad = true;
			return;
		}
	})
	if(!iframeHad) {
		var appendIframe = '<div class="frame-form-full iframeContent frame-form-full-left jsOpenIframe" id="' + asideMuneId + '">' +
			'<iframe id="jsOpenIframeContent" name="jsOpenIframeContent" class="full-screen" src="' + mapTypeSrc + '"  frameborder="0" name="mainContent"></iframe>' +
		'</div>';
		$('body').append(appendIframe);
		$('#openIframeList li').removeClass('active');
		$('#openIframeList').append('<li data-anchor="' + menuTarget + '" class="active" asideMuneId="' + asideMuneId + '">' + asideMuneName + '<i class="icon-cancel-circle"></i></li>')
		openAllList();
	}


}
function showMenu(){
	if($("#homePageNav a").length>0){
		$("#homePageNav").click();
	}else{
		$(".iframeContent").addClass("hide");
		$("#menuView").removeClass("hide");
		$("#rightMainDiv").addClass("hide");
	}
}

/*清除轨迹*/
function clearMapTracks(){
	SuntekMap.getMap().clear();//清除地图框选
	SuntekMap.getMap().callModule("trackplayer","clearAll");//清除轨迹
	SuntekMap.getMap().unloadModules(["trackLoader","trackplayer"]);//清除轨迹播放控件
}

//清除频次分析结果 
function clearCarAnalysis(){
	SuntekMap.getMap().unloadModules(["carAnalysis"]);//清除、移除频次分析控件
	SuntekMap.getMap().unloadModules(["routeAnalysis"]);//移除轨迹规划控件
	SuntekMap.getMap().unloadModules(["mapToolbar"]);//移除工具栏控件	
}

/*右侧内容显示隐藏*/
function rightMainFrameIn(url,type){
	var $rightMainDiv = $('#rightMainDiv'),
		$rightMainFrame = $('#rightMainFrame');
	$rightMainDiv.removeClass("hide");
	if(type!='show'){
		$rightMainFrame.attr('src',url);
	}
}
function rightMainFrameOut(type){
	var $rightMainDiv = $('#rightMainDiv'),
	$rightMainFrame = $('#rightMainFrame');
	$rightMainDiv.addClass("hide");
	if(type!='hide'){
		$rightMainFrame.attr('src','');
	}
}

function addLayer(){
	var html = '<div class="layer"></div>';
	$("body").append(html);
}

function removeLayer(){
	$("body").find(".layer").remove();
}

// 导航查看更多
function headerMore() {
    $('body').on('click','.items-menu',function (ev) {
        var event=(ev)?ev:window.event;
        var $target= $(event.target);
        if($target.hasClass('not')||$target.closest('li').hasClass('not')){
            return;
		}else {
            $(this).hide();
		}
    });
	$("#headerMore").click(function () {
		$(".items-menu").show();
    });

}
// 导航查看更多

//弹窗的关闭图片时，关闭视频
function closeImgShowVideo($video){
	$(".expand-close.close-bg").click(function(){
		$video.removeClass("hide");
		$(".expand-photo").remove();
	});
}

