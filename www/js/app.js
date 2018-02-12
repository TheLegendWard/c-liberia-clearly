angular.module("c_liberia_clearly", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","c_liberia_clearly.controllers", "c_liberia_clearly.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "C LIBERIA CLEARLY" ;
		$rootScope.appLogo = "" ;
		$rootScope.appVersion = "1.3" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "c_liberia_clearly",
				storeName : "c_liberia_clearly",
				description : "The offline datastore for C LIBERIA CLEARLY app"
			});



			//required: cordova plugin add onesignal-cordova-plugin --save
			if(window.plugins && window.plugins.OneSignal){
				window.plugins.OneSignal.enableNotificationsWhenActive(true);
				var notificationOpenedCallback = function(jsonData){
					try {
						$timeout(function(){
							$window.location = "#/c_liberia_clearly/" + jsonData.notification.payload.additionalData.page ;
						},200);
					} catch(e){
						console.log("onesignal:" + e);
					}
				}
				window.plugins.OneSignal.startInit("e5865b00-ab96-4822-be86-85cba6823dcc").handleNotificationOpened(notificationOpenedCallback).endInit();
			}    


		});
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})



.config(function($stateProvider,$urlRouterProvider,$sceDelegateProvider,$ionicConfigProvider,$httpProvider){
	/** tabs position **/
	$ionicConfigProvider.tabs.position("bottom"); 
	try{
	// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("c_liberia_clearly",{
		url: "/c_liberia_clearly",
		abstract: true,
		templateUrl: "templates/c_liberia_clearly-tabs.html",
	})

	.state("c_liberia_clearly.about_me", {
		url: "/about_me",
		cache:false,
		views: {
			"c_liberia_clearly-about_me" : {
						templateUrl:"templates/c_liberia_clearly-about_me.html",
						controller: "about_meCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.about_us", {
		url: "/about_us",
		views: {
			"c_liberia_clearly-about_us" : {
						templateUrl:"templates/c_liberia_clearly-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.contact_information", {
		url: "/contact_information",
		views: {
			"c_liberia_clearly-contact_information" : {
						templateUrl:"templates/c_liberia_clearly-contact_information.html",
						controller: "contact_informationCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.contact_us", {
		url: "/contact_us",
		views: {
			"c_liberia_clearly-contact_us" : {
						templateUrl:"templates/c_liberia_clearly-contact_us.html",
						controller: "contact_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.home", {
		url: "/home",
		cache:false,
		views: {
			"c_liberia_clearly-home" : {
						templateUrl:"templates/c_liberia_clearly-home.html",
						controller: "homeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.home_2_singles", {
		url: "/home_2_singles/:id",
		cache:false,
		views: {
			"c_liberia_clearly-home_2_" : {
						templateUrl:"templates/c_liberia_clearly-home_2__singles.html",
						controller: "home_2_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.home_bookmark", {
		url: "/home_bookmark",
		cache:false,
		views: {
			"c_liberia_clearly-home_bookmark" : {
						templateUrl:"templates/c_liberia_clearly-home_bookmark.html",
						controller: "home_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.home_singles", {
		url: "/home_singles/:id",
		cache:false,
		views: {
			"c_liberia_clearly-home" : {
						templateUrl:"templates/c_liberia_clearly-home_singles.html",
						controller: "home_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.profile", {
		url: "/profile",
		cache:false,
		views: {
			"c_liberia_clearly-profile" : {
						templateUrl:"templates/c_liberia_clearly-profile.html",
						controller: "profileCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.videos", {
		url: "/videos",
		cache:false,
		views: {
			"c_liberia_clearly-videos" : {
						templateUrl:"templates/c_liberia_clearly-videos.html",
						controller: "videosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.videos_singles", {
		url: "/videos_singles/:snippetresourceIdvideoId",
		cache:false,
		views: {
			"c_liberia_clearly-videos" : {
						templateUrl:"templates/c_liberia_clearly-videos_singles.html",
						controller: "videos_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("c_liberia_clearly.youtube_playlist_singles", {
		url: "/youtube_playlist_singles/:snippetresourceIdvideoId",
		cache:false,
		views: {
			"c_liberia_clearly-archive" : {
						templateUrl:"templates/c_liberia_clearly-youtube_playlist_singles.html",
						controller: "youtube_playlist_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})


// router by user


	$urlRouterProvider.otherwise("/c_liberia_clearly/home");
});
