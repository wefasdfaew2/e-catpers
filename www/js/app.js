angular.module("m", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","ngMap","m.controllers", "m.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Lapor Propam" ;
		$rootScope.appLogo = "data/images/icon/icon.png" ;
		$rootScope.appVersion = "11.79" ;

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
				name : "m",
				storeName : "m",
				description : "The offline datastore for m app"
			});



		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("m.utama");
			}
			e.preventDefault();
			return false;
		},101);
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





.config(function($stateProvider,$urlRouterProvider,$sceDelegateProvider,$ionicConfigProvider,$httpProvider){
	/** tabs position **/
	$ionicConfigProvider.tabs.position("bottom"); 
	try{
	// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?bidpropamkaltim\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("m",{
		url: "/m",
		abstract: true,
		templateUrl: "templates/m-tabs.html",
	})

	.state("m.about_us", {
		url: "/about_us",
		views: {
			"m-about_us" : {
						templateUrl:"templates/m-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.dashboard", {
		url: "/dashboard",
		views: {
			"m-dashboard" : {
						templateUrl:"templates/m-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.dpo", {
		url: "/dpo",
		views: {
			"m-dpo" : {
						templateUrl:"templates/m-dpo.html",
						controller: "dpoCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.faqs", {
		url: "/faqs",
		views: {
			"m-faqs" : {
						templateUrl:"templates/m-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.form_laporanmasyarakat", {
		url: "/form_laporanmasyarakat",
		views: {
			"m-form_laporanmasyarakat" : {
						templateUrl:"templates/m-form_laporanmasyarakat.html",
						controller: "form_laporanmasyarakatCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.form_masyarakat_saran", {
		url: "/form_masyarakat_saran",
		views: {
			"m-form_masyarakat_saran" : {
						templateUrl:"templates/m-form_masyarakat_saran.html",
						controller: "form_masyarakat_saranCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.help", {
		url: "/help",
		views: {
			"m-help" : {
						templateUrl:"templates/m-help.html",
						controller: "helpCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.informasi", {
		url: "/informasi/:categories",
		cache:false,
		views: {
			"m-informasi" : {
						templateUrl:"templates/m-informasi.html",
						controller: "informasiCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.informasi_singles", {
		url: "/informasi_singles/:id",
		cache:false,
		views: {
			"m-informasi" : {
						templateUrl:"templates/m-informasi_singles.html",
						controller: "informasi_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.kritik_saran", {
		url: "/kritik_saran",
		views: {
			"m-kritik_saran" : {
						templateUrl:"templates/m-kritik_saran.html",
						controller: "kritik_saranCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.lapor_propam", {
		url: "/lapor_propam",
		views: {
			"m-lapor_propam" : {
						templateUrl:"templates/m-lapor_propam.html",
						controller: "lapor_propamCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.menu_1", {
		url: "/menu_1",
		views: {
			"m-menu_1" : {
						templateUrl:"templates/m-menu_1.html",
						controller: "menu_1Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.menu_2", {
		url: "/menu_2",
		views: {
			"m-menu_2" : {
						templateUrl:"templates/m-menu_2.html",
						controller: "menu_2Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.opsi", {
		url: "/opsi",
		views: {
			"m-opsi" : {
						templateUrl:"templates/m-opsi.html",
						controller: "opsiCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.ptdh", {
		url: "/ptdh",
		views: {
			"m-ptdh" : {
						templateUrl:"templates/m-ptdh.html",
						controller: "ptdhCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"m-slide_tab_menu" : {
						templateUrl:"templates/m-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.sp2hp", {
		url: "/sp2hp",
		views: {
			"m-sp2hp" : {
						templateUrl:"templates/m-sp2hp.html",
						controller: "sp2hpCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("m.utama", {
		url: "/utama",
		views: {
			"m-utama" : {
						templateUrl:"templates/m-utama.html",
						controller: "utamaCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/m/utama");
});
