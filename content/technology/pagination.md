最近在用Angular.js写一个网页播放器的系统，要用到列表分页，网上找的看着不是很合适，所以只好自己造轮子了。

[Github://github.com/Shafley/Angular-pagination](https://github.com/Shafley/Angular-pagination)

[Demo://shafley.github.io/learn/](http://shafley.github.io/learn/pagination/)
##### Install
    npm install angular-pagination
##### Code：
    html:
        &lt;li class="talk-music-pic"
            ng-repeat="music in musicEmotion |
            offset: currentPage*itemsPerPage |
            limitTo: itemsPerPage"&gt; 分页分页分页&lt;/li&gt;

        //指令接口
        //currentPage: 当前页数-1
        //itemsPerPage: ng-repeat 显示的列表数目
        //itemsList: ng-repeat的数组(对象)
        //pageList: 显示的页码数目
        &lt;pagination currentPage="0" itemsPerPage="4"
            itemsList="musicEmotion" pageList="2"&gt;&lt;/pagination&gt;

```javascript
js:
    //controller
        music.controller('SearchCtrl', ['$scope', 'searchService', function ($scope, searchService){
            //从service取数据
            searchService.getSearchList($scope.searchKey).then(function (data){
                $scope.musicEmotion = data;
                $scope.$broadcast('musicEmotion');
            });
        }]);

    //directive
        angular.module('pagination.directives', []);
        music.directive('pagination', function (){
            return {
                restrict: 'AE',
                replace: true,
                template: '\
                    &lt;div&gt;\
                        &lt;span ng-click="jumpHead()"&gt;首页&lt;/span&gt; \
                        &lt;span ng-click="prevPage()" \
                        ng-disabled="prevPageDisabled()"&gt;上一页&lt;/span&gt;\
                        &lt;sapn ng-hide="prevPageDisabled() || (currentNum+1&lt;=1)"&gt; \
                            ...&lt;/sapn&gt; \
                        &lt;span ng-repeat="num in number | \
                            offset: currentNum*pageList | \
                            limitTo: pageList" \
                            ng-click="jumpPage(num)" \
                            ng-class="{numactive: currentPage+1 == num}"&gt;{{num}} \
                            &lt;/span&gt; \
                        &lt;sapn ng-hide="nextPageDisabled() || (total&lt;=pageList)"&gt; \
                            ...&lt;/sapn&gt; \
                        &lt;span ng-click="nextPage()" \
                        ng-disabled="nextPageDisabled()"&gt;下一页&lt;/span&gt; \
                        &lt;span ng-click="jumpEnd()"&gt;尾页&lt;/span&gt; \
                    &lt;/div&gt;',
                link:function (scope, element, attrs){
                    scope.$on(attrs.itemslist, function() {
                        finish();
                    });
                    var finish = function() {
                        scope.currentPage = attrs.currentpage;
                        scope.itemsPerPage = attrs.itemsperpage;
                        scope.itemsList = scope[attrs.itemslist];
                        scope.pageList = attrs.pagelist;

                        console.log(scope.itemsList);

                        scope.pageCount = function () {
                            if (scope.itemsList) {
                                return Math.ceil(scope.itemsList.length / scope.itemsPerPage);
                            } else {
                                return 1;
                            }
                        };
                        scope.total = scope.pageCount();

                        scope.number = [];
                        for(var i=0; i<scope.total; i++){
                            scope.number.push(i+1);
                        };

                        scope.currentNum = 0;
                        scope.jumpPageList = function (){
                            scope.currentNum = parseInt(scope.currentPage/scope.pageList);
                        };

                        scope.jumpPage = function (num){
                            scope.currentPage = num -1;
                            scope.jumpPageList();
                        };

                        scope.jumpHead = function (){
                            scope.currentPage = 0;
                            scope.jumpPageList();
                        }

                        scope.jumpEnd = function (){
                            scope.currentPage = scope.total-1;
                            scope.jumpPageList();
                        }

                        scope.prevPage = function () {
                            if(scope.prevPageDisabled()){
                                return;
                            }
                            if (scope.currentPage > 0) {
                                scope.currentPage--;
                            }
                            scope.jumpPageList();
                        };

                        scope.prevPageDisabled = function () {
                            return scope.currentPage +1 == 1;
                        };

                        scope.nextPage = function () {
                            if(scope.nextPageDisabled()){
                                return;
                            }
                            if (scope.currentPage < scope.pageCount()) {
                                scope.currentPage++;
                            }
                            scope.jumpPageList();
                        };

                        scope.nextPageDisabled = function () {
                            return (scope.currentPage +1) == scope.total;
                        };
                    };
                }
            }
        });

    //filter
        angular.module('pagination.filters', []);

        music.filter('offset', function () {
            return function (input, start) {
                if (input) {
                    start = parseInt(start, 10);
                    return input.slice(start);
                } else {
                    return [];
                }
            };
        });
```