'use strict';

/* Controllers */

angular.module('app.controllers', [])
    .controller('AppCtrl', ['$scope', '$rootScope', 'blogService', function ($scope, $rootScope, blogService) {
        $rootScope.app = {
            'organization': '蒙蒙',
            'owner': '蒙蒙',
            // sub_title: 'Thoughts, stories and ideas.',
            'blog_category': '博文分类',
            'photo_album': '时光相册',
            // message_board: '留言板',
            'web_url': 'https://Shafley.github.io',
            //'disqus_shortname': 'shafley',
        };

        var audio = $('audio')[0];
        $rootScope.state = false;
        $scope.playMusic = function (){
            if($rootScope.state){
                audio.pause();
                $rootScope.state = false;
            }else{
                audio.play();
                $rootScope.state = true;
            }
        };

        $scope.get_category_list = function (){
            blogService.get_category_list().then(function (category_list){
                $scope.category_list = category_list;
            });
        };
        $scope.get_category_list();
    }])

    .controller('BlogListCtrl', ['$scope', '$routeParams', '$rootScope', 'blogService',
        function ($scope, $routeParams, $rootScope, blogService) {
            $rootScope.detail = false;

            $scope.get_blog_list = function (){
                var tag = $routeParams.tag;
                var author = $routeParams.author;
                var category = $routeParams.category;

                if (tag) {
                    blogService.get_tag_blog_list(tag).then(function (blog_list){
                        $scope.blog_list = blog_list;
                    });
                } else if (author) {
                    blogService.get_author_blog_list(author).then(function (blog_list){
                        $scope.blog_list = blog_list;
                    });
                } else if (category) {
                    blogService.get_category_blog_list(category).then(function (blog_list){
                        $scope.blog_list = blog_list;
                    });
                } else {
                    blogService.get_blog_list().then(function (blog_list) {
                        $scope.blog_list = blog_list;
                    });
                }
            };

            $scope.get_blog_list();

            $scope.itemsPerPage = 4;
            $scope.currentPage = 0;

            $scope.pageCount = function () {
                if ($scope.blog_list) {
                    return Math.ceil($scope.blog_list.length / $scope.itemsPerPage);
                } else {
                    return 1;
                }
            };

            $scope.prevPage = function () {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.prevPageDisabled = function () {
                return $scope.currentPage +1 === 1;
            };

            $scope.nextPage = function () {
                if ($scope.currentPage < $scope.pageCount()) {
                    $scope.currentPage++;
                }
            };

            $scope.nextPageDisabled = function () {
                return $scope.currentPage +1 === $scope.pageCount();
            };

        }])

    .controller('BlogDetailCtrl', ['$scope', '$routeParams', '$rootScope', 'blogService',
        function ($scope, $routeParams, $rootScope, blogService) {
            $rootScope.detail = true;
            var slug = $routeParams.slug;
            $scope.contentLoaded = false;

            $scope.get_blog_slug = function (){
                blogService.get_blog(slug).then(function (blog){
                    $scope.blog = blog;
                    $scope.contentLoaded = true;
                });
            };
            $scope.get_blog_slug();

            $scope.content_md_url = function (blog) {
                if (blog) {
                    return blog.content_md_url;
                } else {
                    return '';
                }
            };
        }])
;