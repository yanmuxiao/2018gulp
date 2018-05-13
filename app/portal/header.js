/*
 * @Author fenghuixia
 * @version 2017-06-13
 * @description 二级菜单切换文件
 */
$(function(){
	UI.control.setPermissionClass('hide');
	UI.control.init(["userInfo"]);
	var userInfo = UI.control.getUserInfo();
	    $("#userName").html(userInfo.name);
	    
	UI.control.initPermission(); //初始化权限
	hideMenuLi();//根据权限处理菜单样式    
	initEvent();
	
	var mainHref = $('.header-nav a[href^="#"]').not('.hide').eq(0).attr("href");
	if(location.href.indexOf("#") < 0){
		location.href = location.href + mainHref;
	}
	
	initMenuStatus();
	/*initMap();*/
	
	initApplicationMenu();
	initTask();
});

function initEvent(){
	//二级菜单显示隐藏
	$(".header-nav>dd").mouseenter(function(){
	    $(this).addClass("active");
	}).mouseleave(function(){
		$(this).removeClass("active");
	});
	
	//二级菜单点击事件
	$(".header-nav li a,.header-right .dropdown-menu a").click(function(){
		var $this = $(this);
		if(!$this.hasClass("disable-permission")){
			var ref = $this.attr("url");

			var asideMuneId = $this.attr("ui-permission") || $this.attr("asideMuneId");
			var asideMuneName = $this.text();

			var menuTarget = $this.attr("href");
			var targetFrame = $this.attr("targetframe");

			//立体化防控里面的车辆告警
			if($(this).attr('ui-permission') == 'DEFENCE_carlAlarm') {
				var menuId = 48;
				$.ajax({
	        		async:false,
	        		url : "/vehiclecloud/rest/v6/yisaLogin/getMenus",
	        		success:function(resp) {
	        			var menus = resp.menus;
	    				var menuNode = menus[menuId];
	    				ref = menuNode.link;
	    				console.log('id : ' + menuNode.id +  ',url : ' + menuNode.link + ',name : ' + menuNode.name);
	    				targetFrame = 'fullFrame';
	        		},
	        		error : function() {
	        			UI.util.alert("页面加载失败","warn");
	        			targetFrame = 'fullFrame';
	    				ref = '';
	        		}
	        	});
			}

			if($(".header-nav").hasClass("hide")){
				showHeaderMenu();
			}
			
			var curIndex = menuTarget.lastIndexOf("/");
			var menuType= $this.attr("showmenu");
			
			$(".header-nav li").removeClass("active");
			$this.parent().addClass("active");
			if(curIndex>0){
				var subMenuTarget = menuTarget.substring(curIndex+1);
			}
			if(menuType){
				showMenuView(menuType);
			}else if(targetFrame == 'leftFrame' && $(this).attr('data-ignore')){
				// var mapType = $this.parent().attr("maptype");
				var mapType = $this.parent().attr("maptype") || $this.attr("maptype");
				animateLeftFrameIn(ref,mapType,menuTarget,asideMuneId,asideMuneName);
			}else{
				var mapType = $this.parent().attr("maptype") || $this.attr("maptype");
				goUrl( menuTarget ,ref, targetFrame, asideMuneId, asideMuneName, mapType);
			}
			//clearMap();
			
		}
	});
	
	//一级菜单点击默认选择第一个
	$(".header-nav dd>a").click(function(){
		var $this = $(this);
		if($this.parent().hasClass("no-menu")){
			$this.next().find("li:first a").click();
		}else{
			$this.next().find("li:visible:first a").click();
		}
	});

	//一级菜单点击showCommonWindow；
	$(".dropdown-menu-li").click(function () {
		var type = $(this).attr('type');
		if(type=="alarmSetting"){
            UI.util.showCommonWindow("/datadefence/page/multiDimensional/alarmThresholdSettings.html", "告警配置",800,600)
		};
    })

	
	//智能挖掘技战法
	$("#menuView a").click(function(){
		var $this = $(this);
		var ref = $this.attr("url");
		var targetFrame = $this.attr("targetframe");
		
		//2017-11-30  省厅视频云+需求
		var href = $(this).attr('href'),
			type = $(this).attr('type');
		// if((href == '#intelligent/DEFENCE_car' || href == '#resources/DEFENCE_carPlateCaptureList'
		// 	|| href == '#investigationControl/DEFENCE_carControl' ) && type != 'js') {
		// 	var permission = $(this).attr('permission').split('_');
		// 	var menuId = permission.length >= 2 ? permission[1] : "";
		// 	$.ajax({
  //       		async:false,
  //       		url : "/vehiclecloud/rest/v6/yisaLogin/getMenus",
  //       		success:function(resp) {
  //       			var menus = resp.menus;
  //   				var menuNode = menus[menuId];
  //   				ref = menuNode.link;
  //   				console.log('id : ' + menuNode.id +  ',url : ' + menuNode.link + ',name : ' + menuNode.name);
  //   				targetFrame = 'fullFrame';
  //       		},
  //       		error : function() {
  //       			UI.util.alert("页面加载失败","warn");
  //       			targetFrame = 'fullFrame';
  //   				ref = '';
  //       		}
  //       	});
		// }
		
		$("#menuView").addClass("hide");

		var permissionId = $(this).attr('permission') || $(this).attr('asideMuneId') || $(this).attr('ui-permission');
		var title = $(this).find('h3').text();
		var menuTarget = $(this).attr('href');

		
		if(targetFrame == 'fullFrame'){
			// goUrl( '#home', ref, targetFrame);
			var mapType = $this.parent().attr("maptype") || $this.attr("maptype");
			goUrl( '#home', ref, targetFrame, permissionId, title, mapType);
		}else{
			var mapType = $this.parent().attr("maptype") || $this.attr("maptype");
			animateLeftFrameIn(ref,mapType, menuTarget, permissionId, title);
		}
		//clearMap();
	});
	
	$("#homePageNav").click(function(){
		//$("#menuView").removeClass("hide");
		var url = $(this).find("a").attr("url");
		$(".iframeContent").addClass("hide");
		$("#mainContentDiv").removeClass("hide");
		$("#mainContentDiv iframe").attr('src',url);
		$(".header-nav li").removeClass("active");
		$(".header-nav").addClass("hide");
	})
}

function initApplicationMenu(){
	
	var menu = UI.control.getPermissionMenus();
	var menuNum = 0;
	if (menu["DEFENCE_datadefence"]) {
		$('.DEFENCE').removeClass('hide');
		menuNum ++;
	}
	
	if (menu['efacecloud']) {
		$('.EFACE').removeClass('hide');
		menuNum ++;
	}
	
	if (menu['VEHICLE_vehicle']) {
		$('.VEHICLE').removeClass('hide');
		menuNum ++;
	}
	
	if (menuNum > 1) {
		$("#headerMore").removeClass('hide');
	} else {
		$("#headerMore").addClass('hide');
	}
	
	/*for(var i in menu){
		if(i.indexOf('DEFENCE_datadefence') >= 0){
			$('.DEFENCE').removeClass('hide');
		}
		if(i.indexOf('efacecloud') >= 0){
			$('.EFACE').removeClass('hide');
		}
		if(i.indexOf('VEHICLE_vehicle') >= 0){
			$('.VEHICLE').removeClass('hide');
		}
	}*/
	
}

function showHomeMenu($this){
	var ref = $this.attr("url");
	var targetFrame = $this.attr("targetframe");

	var permissionId = $this.attr('permission') || $this.attr('asideMuneId') || $this.attr('ui-permission');
	var title = $this.find('h3').text();
	var menuTarget = $this.attr('href');
	
	//$("#menuView").addClass("hide");
	
	$("#mainContentDiv").addClass("hide");
	if(targetFrame == 'fullFrame'){
		var mapType = $this.parent().attr("maptype") || $this.attr("maptype");
		goUrl('#home', ref, targetFrame, permissionId, title, mapType);
	}else{
		var mapType = $this.parent().attr("maptype") || $this.attr("maptype");
		animateLeftFrameIn(ref,mapType, menuTarget, permissionId, title);
	}
}

/**
 * 刷新页面时 初始化一级菜单状态，并初始化框架路径
 */
function initMenuStatus(){
 		
	var url = window.location.href,
		startIndex = url.lastIndexOf("#"),
		index = url.lastIndexOf("/"),
		menuTarget = '',
		subMenuTarget = '';
	
	if (startIndex > index) {
	// 说明没有subMenuTarget，如：http://172.28.50.29:8088/portal/page/datadefenceMenu.html#home
		menuTarget = url.substring(startIndex);
	} else {
		menuTarget = url.substring(startIndex, index);// menuTarget: location.href的主menu
		subMenuTarget = url.substring(index+1); //  subMenuTarget: location.href的subMune
	}
	
	$(".header-nav li").removeClass('active');
	
	if(menuTarget == '#home'){// 只适合人脸和车辆模块，物联网模块页面会空白
		$("#homePageNav").click();
		return false;
	}else{
		showHeaderMenu();
	}
	// 只有一级menuTarget，点击第一个没有.hide的二级菜单
	$.each( $(".header-nav>dd>a"),function(i,n){
		var $curA = $(this);
		var _menuTarget = $curA.attr('href');
		var thisMenuTarget = url.substring(startIndex); // menuTarget + subMenuTarget
		if( _menuTarget == thisMenuTarget ){
			$curA.next(".dropdown-menu").find("a").not('.hide').eq(0).click();
			return false;
		}
	});
	// menuTarget + subMenuTarget
	$.each( $(".dropdown-menu a"), function(i, n){
		
		var $curA = $(this),
			curAUrl = $curA.attr("url");
		var _menuTarget = $curA.attr('href');// menuTarget + subMenuTarget
		var _menuType= $curA.attr("showmenu");// 打开新的iframe，也就是3级menu
		var targetFrame = $curA.attr("targetframe");
		if(_menuTarget){
			var curIndex = _menuTarget.lastIndexOf("/");
		}
		if(curIndex>0){
			var _subMenu = _menuTarget.substring(curIndex+1);
			_menuTarget = _menuTarget.substring(0,curIndex);
		}
		if( _menuTarget == menuTarget ){// 主menu相等
			if(subMenuTarget){ // 存在subMenu
				if(subMenuTarget == _subMenu){
					$curA.parent().addClass('active'); // 当前li选中，添加.active
					if(_menuType){
						showMenuView(_menuType);
					}else{
						var asideMuneId = $curA.attr('asidemuneid') || $curA.attr('ui-permission');
						var asideMuneName = $curA.text();
						var mapType = $curA.parent().attr("maptype") || $curA.attr("maptype");
						goUrl( _menuTarget ,curAUrl,targetFrame, asideMuneId, asideMuneName, mapType);
					}
				}
			} else {// 不存在subMenu
				$curA.parent().addClass('active'); // 当前li选中，添加.active
				if(curAUrl){
					var asideMuneId = $curA.attr('asidemuneid') || $curA.attr('ui-permission');
					var asideMuneName = $curA.text();
					var mapType = $curA.parent().attr("maptype") || $curA.attr("maptype");
					goUrl( _menuTarget, curAUrl, targetFrame, asideMuneId, asideMuneName, mapType);
				}else{
					showMenuView(_menuType);
				}
				return false;
			}
		}
		
	});	
}

/* 展示侦查布控导航（3级menu） */
function showMenuView(type){
	$("#menuView").removeClass("hide");
	$("#menuView .data-info").addClass("hide");
	switch(type)
	{
	case 'person':
		var id = "#personTactics";
	  break;
	case 'car':
		var id = "#carTactics"
	  break;
	case 'more':
		var id = "#moreData"
	  break;
	case 'carSearch':
		var id = "#vehicleSearch"
		break;
	case 'carControl':
		var id = "#vehicleControl"
		break;
	}
	var $curMenu = $(id);
	$curMenu.removeClass("hide");
	var curALen = $curMenu.find("a").length;
	var hideALen = $curMenu.find("a.hide").length;
	if(curALen == hideALen){ // 判断是否有3级menu列表
		$("#noData").removeClass("hide");
	}
}

/*跳转页面*/
/*
 * @Author fenghuixia, xlg
 * @version 2017-06-13, 2018-05-13
 * @description 二级菜单切换文件
 * menuTarget: 主menu + 子menu
 * src: iframe的src路径
 * targetFrame：iframe是否全屏，fullFrame（全屏），leftFrame（src需要带上pageUrl参数）
 * asideMuneId，asideMuneName：打开的iframe的id和title
 * mapType：地图类型（jsMap）
 */
function goUrl( menuTarget, src, targetFrame, asideMuneId, asideMuneName, mapType){

	if(!asideMuneId) {
		var activeMenu = $('.dropdown-menu li.active a');
		asideMuneId = activeMenu.attr('asidemuneid') || activeMenu.attr('ui-permission');
		asideMuneName = activeMenu.text();
		mapType = activeMenu.parent().attr("maptype") || activeMenu.attr("maptype");;
	}

	
	// var $mainContentDiv = $('#mainContentDiv');
	// var $mainContent = $mainContentDiv.find('iframe');
	var $mapMainContentDiv = $('#controlMainContentDiv');
	var $mapMainContent = $mapMainContentDiv.find('iframe');
	var $leftContent = $("#leftMainDiv iframe");
	var $rightContent = $("#rightMainDiv iframe");
	
	/*$("#menuView,#menuView .tile-group").addClass("hide");*/
	$("#menuView").addClass("hide");
	
	$(".iframeContent").addClass("hide");
	// $(".iframeContent").not($("#controlMainContentDiv")).find("iframe").attr("src",'');

	if(targetFrame == 'fullFrame'){
		
		// if( menuTarget != '#Stereoscopic/DEFENCE_home' && menuTarget != '#Stereoscopic'){//#map
		// 	$mainContentDiv.removeClass("hide");
		// 	$mainContent.attr('src',src);
		// }else{
		// 	if( $mapMainContent.attr('src') != src ){
		// 		$mapMainContent.attr('src',src);
		// 	}
		// 	$mapMainContentDiv.removeClass("hide");
		// }

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
				'<iframe id="jsOpenIframeContent" name="jsOpenIframeContent" class="full-screen" src="' + src + '"  frameborder="0" name="mainContent"></iframe>' +
			'</div>';
			$('body').append(appendIframe);
			$('#openIframeList li').removeClass('active');
			$('#openIframeList').append('<li data-anchor="' + menuTarget + '" class="active" asideMuneId="' + asideMuneId + '">' + asideMuneName + '<i class="icon-cancel-circle"></i></li>')
			openAllList();
		}
		

	}else if(targetFrame == 'leftFrame'){
		// $("#leftMainDiv").removeClass("hide");
		// $("#controlMainContent").removeClass("hide");
		// $leftContent.attr('src','/portal/page/tacticsFrame.html?pageUrl='+src);
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

			// vehiclecloud模块使用独立的jsMap
			var mapTypeSrc = '/portal/page/tacticsFrame.html?pageUrl=' + src;
			if(mapType == 'jsMap'){
				var locationHref = window.location.href;
				// if(locationHref.indexOf('datadefenceMenu.html') >= 0) {
				// 	moduleType = '/datadefence'
				// }else if(locationHref.indexOf('efacecloudMenu.html') >= 0) {
				// 	moduleType = '/efacecloud'
				// }else 
				if(locationHref.indexOf('vehiclecloudMenu.html') >= 0) {
					var moduleType = '/vehiclecloud'
					mapTypeSrc = moduleType + '/page/technicalStation/technicalCommonMap/tacticsFrameJs.html?pageUrl=' + src;
				}else{
					mapTypeSrc = '/portal/page/tacticsFrameJs.html?pageUrl=' + src;
				}
			}

			var appendIframe = '<div class="frame-form-full iframeContent frame-form-full-left jsOpenIframe" id="' + asideMuneId + '">' +
				'<iframe id="jsOpenIframeContent" name="jsOpenIframeContent" class="full-screen" src="' + mapTypeSrc + '"  frameborder="0" name="mainContent"></iframe>' +
			'</div>';
			$('body').append(appendIframe);
			$('#openIframeList li').removeClass('active');
			$('#openIframeList').append('<li data-anchor="' + menuTarget + '" class="active" asideMuneId="' + asideMuneId + '">' + asideMuneName + '<i class="icon-cancel-circle"></i></li>')
			openAllList();
		}
	}
	
}

function initMap(){
	SuntekMap.require("map",[],function(){
		SuntekMap.getMap().unloadModules(["navigation"]);
	});
	
}

function clearMap(){
	clearMapTracks();
	clearCarAnalysis();
	SuntekMap.getMap().clear();
	SuntekMap.getMap().setLayerVisible("V_KK_INFO",false); //清除卡口红点
	SuntekMap.getMap().closeInfoWindow();
}

/**
 * 二级菜单样式处理
 * @author：lyy
 */
//导航样式处理,hide掉的a标签的父级标签li的border隐藏@lyy
function hideMenuLi() {	
	$('.dropdown-menu a.hide').parent('li').addClass('hide');
	var $dropdownMenu = $('.dropdown-menu');
	$dropdownMenu.each(function(){
		$(this).find('li:not(.hide)').first().addClass('no-border');
	});
}

function showHeaderMenu(){
	$("#mainContentDiv").addClass("hide");
	$(".header-nav").removeClass("hide");
}




/***** xlg iframe窗口缓存 *****/

// iframe tab窗口切换
$('#openIframeList').on('click', 'li', function(e) {
	if($(e.target).is('li')) {
		if($(this).hasClass('active')) {
			return;
		}
		if($(this).attr('data-anchor') !== 'noMenuTarget') {
			window.parent.location.href = window.parent.location.href.split('#')[0] + $(this).attr('data-anchor');
		}
		$(this).addClass('active').siblings('li').removeClass('active');
		$('.jsOpenIframe').addClass('hide');
		$('#' + $(this).attr('asidemuneid')).removeClass('hide');
		$('#iframeListWrap').removeClass('cur');
	}
})
// iframe窗口关闭
$('#openIframeList').on('click', 'i', function() {
	closeTargetTab($(this));
})
function closeTargetTab($this) {

	if($('#openIframeList li').length <= 1) {
		UI.util.alert('至少保留一个窗口！', 'wran');
		return;
	}

	if($this.closest('li').hasClass('active')) {
		var next =$this.closest('li').next();
		if(next.length > 0) {
			next.addClass('active');
			$('#' + next.attr('asidemuneid')).removeClass('hide');
			if($this.attr('data-anchor') !== 'noMenuTarget') {
				window.parent.location.href = window.parent.location.href.split('#')[0] + next.attr('data-anchor');
			}
		}else{
			var prev =$this.closest('li').prev();
			prev.addClass('active');
			$('#' + prev.attr('asidemuneid')).removeClass('hide');
			if($this.attr('data-anchor') !== 'noMenuTarget') {
				window.parent.location.href = window.parent.location.href.split('#')[0] + prev.attr('data-anchor');
			}
		}
	}
	$this.closest('li').remove();
	$('#' + $this.closest('li').attr('asidemuneid')).remove();
	openAllList();
}

// tab列表是否超过一行
function openAllList() {
	// 只有一个tab的时候不显示tab列表
	if($('#openIframeList li').length > 1) {
		$('.jsOpenIframe').removeClass('iframeTop0');
		$('.iframe-menu-list').show();
	}else{
		$('.jsOpenIframe').addClass('iframeTop0');
		$('.iframe-menu-list').hide();
	}

	if($('#openIframeList').height() > 50) {
		$('.openAllList').removeClass('hide');
	}else{
		$('.openAllList').addClass('hide');
		$('#iframeListWrap').removeClass('cur');
	}

}
// tab超过一行点击show/hide事件，通过添加类.cur
$('.openAllList').click(function() {
	$('#iframeListWrap').toggleClass('cur');
})
// 窗口resize重新判断tab是否超过一行
$(window).resize(function() {
	openAllList();
})


// 刷新当前tab
$('#refreshTab').click(function() {
	var curIframeId = $('#openIframeList .active').attr('asidemuneid');
	var curIframe = $('#' + curIframeId).find('iframe').eq(0);
	curIframe.attr('src', curIframe.attr('src'));
})
// 关闭当前窗口
$('#closeTargetTab').click(function() {
	closeTargetTab($('#openIframeList .active').eq(0));
})
// 关闭其他窗口
$('#closeOtherTab').click(function() {
	// var curIframeId = $('#openIframeList .active').attr('asidemuneid');
	$('#openIframeList li').not('.active').remove();
	$('.jsOpenIframe.hide').remove();
	openAllList();
})

/***** xlg iframe窗口缓存 ****