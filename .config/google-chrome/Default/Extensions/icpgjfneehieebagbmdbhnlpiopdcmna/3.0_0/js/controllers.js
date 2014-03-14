'use strict';
var controllers = angular.module('newTab.controllers', ['newTab.services']);

controllers.controller('MainController', ['$scope', 'Apps', function ($scope, Apps){
    var enable_top_key = 'ntr.enable_top',
        enable_bookmarks_key = 'ntr.enable_bookmarks',
        bookmarks_count_key = 'ntr.bookmark_count',
        top_count_key = 'ntr.top_count';

    $scope.extension_name = "New Tab Redirect!";
    $scope.enable_bookmarks = false;
    $scope.enable_top = false;
    $scope.bookmarks = [];
    $scope.show_prefs = false;
    $scope.bookmark_count = 10;
    $scope.top_count = 10;

    $scope.save_preferences = function(){
        $scope.show_prefs=false;
        var obj = {};
        obj[enable_bookmarks_key] = $scope.enable_bookmarks;
        obj[enable_top_key] = $scope.enable_top;
        obj[bookmarks_count_key] = $scope.bookmark_count;
        obj[top_count_key] = $scope.top_count;
        Apps.saveSetting(obj);

        // reload bookmarks and topSites
        loadBookmarks();
        loadTopSites();
    };

    function loadBookmarks() {
        return Apps.getBookmarksBar($scope.bookmark_count)
            .then(function (results) {
                if($scope.enable_bookmarks){
                    $scope.bookmarks = results;
                }
            });
    }

    function loadTopSites() {
        return Apps.topSites().then(function (sites) {
            if($scope.enable_top){
                $scope.top = sites.slice(0, $scope.top_count);
            }
        });
    }

    function loadApps() {
        return Apps.getAll()
            .then(function(results){
                $scope.apps = results.filter(function(result){
                    return (/^(extension|theme)$/).test(result.type) === false;
                });
            });
    }

    $scope.$on('UninstalledApp', loadApps);

    // initial page setup
    var querySettings = [enable_top_key, enable_bookmarks_key, bookmarks_count_key, top_count_key];
    Apps.getSetting(querySettings)
        .then(function(settings){
            angular.forEach(querySettings, function(val){
                if(settings.hasOwnProperty(val)) {
                    // because we expect the keys to be in format ntr.[property_name]
                    var scopeKey = val.replace('ntr.','');
                    $scope[scopeKey] = settings[val];
                }
            });

            // define defaults for properties without settings (initial load) here. This helps prevent UI flickering.
            if(angular.isUndefined(settings[enable_bookmarks_key])) {
                $scope.enable_bookmarks = true;
            }

            if(angular.isUndefined(settings[enable_top_key])) {
                $scope.enable_top = true;
            }
        })
        .then(function(){
            loadApps()
                .then(function(){
                    loadBookmarks();
                    loadTopSites();
                });
        })
        .then(function setupWatches(){
            $scope.$watch('bookmark_count', loadBookmarks);
            $scope.$watch('top_count', loadTopSites);
        });
}]);
