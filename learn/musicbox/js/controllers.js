'use strict';

/* Controllers */

angular.module('music.controllers', []);

music.controller('MusicCtrl', ['$scope', '$rootScope', '$interval', '$location', 'audioService',   function ($scope, $rootScope, $interval, $location, audioService){
    $rootScope.musicPlay = {
        'state': false,
        'music':{
            'id': '03',
            'img': 'search.jpg',
            'url': 'songs/Liekkas.mp3'
        },
        play: function (music){
            this.music = music;
            audioService.playMusic();
        },
        //音乐列表中的播放按钮调用
        nextPlay:function(music){
            audioService.nextPlay(music);
        }
    };

    $scope.search = function(){
        $location.path('/search');
    }

    $scope.categorys = [
        {
            cate:'小清新兆赫'
        },
        {
            cate:'流行粤语兆赫'
        },
        {
            cate:'流行日语兆赫'
        }
    ];

    $scope.boxshow = false;

}]);

music.controller('UploadCtrl', ['$scope', function ($scope){
    $scope.music = {};
    $scope.upload = function (music){
        $scope.music.category = $scope.music.category.cate;
        console.log(music);
        // console.log($scope.musicUpload);
    }

    $scope.change = function (element){
        var file = element.files[0];
        var pos = file.name.lastIndexOf(".");
        console.log(file.name);
        //用$apply更新$scope
        $scope.$apply(function(){
            $scope.music.name = file.name;
            $scope.music.type = file.name.substring(pos + 1);
        });
    }
}]);

music.controller('HomeCtrl', ['$scope', 'audioService', 'homeService', function ($scope, audioService, homeService){

    $scope.musicList = [
        {
            "id": "42",
            "singer": "凤凰传奇",
            "playtimes": "52887",
            "name": "最炫民族风",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "14",
            "num": 1
        },
        {
            "id": "71",
            "singer": "陈奕迅",
            "playtimes": "2032",
            "name": "好久不见",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "10",
            "num": 2
        },
        {
            "id": "122",
            "singer": "Eminem",
            "playtimes": "1687",
            "name": "Fack",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "3",
            "num": 3
        },
        {
            "id": "21",
            "singer": "刘佳 SARA",
            "playtimes": "1191",
            "name": "爱很美",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "4",
            "num": 4
        },
        {
            "id": "8703",
            "singer": "周天然",
            "playtimes": "975",
            "name": "戴着面具的谜团",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 5
        },
        {
            "id": "188",
            "singer": "牛奶咖啡",
            "playtimes": "830",
            "name": "明天你好",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "0",
            "num": 6
        },
        {
            "id": "9297",
            "singer": "Lorde",
            "playtimes": "599",
            "name": "Royals",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "0",
            "num": 7
        },
        {
            "id": "1800",
            "singer": "张韶涵",
            "playtimes": "551",
            "name": "看得最的地方",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 8
        },
        {
            "id": "8704",
            "singer": "王麟",
            "playtimes": "499",
            "name": "思密达",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "3",
            "num": 9
        },
        {
            "id": "7145",
            "singer": "初音未来",
            "playtimes": "498",
            "name": "初音ミクの消失",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 10
        }
    ];

    $scope.musicRank = $scope.musicList;

    // homeService.getMusicList().then(function (data){
    //     $scope.musicList = data;
    // });

    // homeService.getRankFour().then(function (data){
    //     $scope.musicRank = data;
    // });

    $scope.playMusic = function (){
        audioService.playMusic();
    }

}]);

music.controller('TalkCtrl', ['$scope', 'talkService', function ($scope, talkService){
    $scope.lastMood = [
        {
            "id": "42",
            "singer": "凤凰传奇",
            "playtimes": "52887",
            "name": "最炫",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "14",
            "num": 1
        },
        {
            "id": "71",
            "singer": "陈奕迅",
            "playtimes": "2032",
            "name": "好久",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "10",
            "num": 2
        },
        {
            "id": "122",
            "singer": "Eminem",
            "playtimes": "1687",
            "name": "Fack",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "3",
            "num": 3
        },
        {
            "id": "21",
            "singer": "刘佳 SARA",
            "playtimes": "1191",
            "name": "爱",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "4",
            "num": 4
        },
        {
            "id": "8703",
            "singer": "周天然",
            "playtimes": "975",
            "name": "谜团",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 5
        },
        {
            "id": "188",
            "singer": "牛奶咖啡",
            "playtimes": "830",
            "name": "你好",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "0",
            "num": 6
        },
        {
            "id": "9297",
            "singer": "Lorde",
            "playtimes": "599",
            "name": "Royals",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "0",
            "num": 7
        },
        {
            "id": "1800",
            "singer": "张韶涵",
            "playtimes": "551",
            "name": "地方",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 8
        },
        {
            "id": "8704",
            "singer": "王麟",
            "playtimes": "499",
            "name": "思密达",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "3",
            "num": 9
        },
        {
            "id": "7145",
            "singer": "未来",
            "playtimes": "498",
            "name": "初音ミクの消失",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 10
        }
    ];

    $scope.lastMusic = $scope.lastMood;

    // talkService.getLastMood().then(function (data){
    //     $scope.lastMood = data;
    //     console.log(data);
    // });

    // talkService.lastMusic().then(function (data){
    //     $scope.lastMusic = data;
    //     console.log(data);
    // });
}]);

music.controller('PlayCtrl', ['$scope', '$rootScope', 'audioService', function ($scope, $rootScope, audioService){

    $scope.channel = [
        {
            'name': '儿歌兆赫',
            'count': '6789'
        },

        {
            'name': '小清新兆赫',
            'count': '6789'
        },

        {
            'name': '经典怀旧兆赫',
            'count': '6789'
        },

        {
            'name': '流行华语兆赫',
            'count': '6789'
        },

        {
            'name': '欧美兆赫',
            'total': '6789'
        },

        {
            'name': '电影原声兆赫',
            'count': '6789'
        },

        {
            'name': '流行粤语兆赫',
            'count': '6789'
        },

        {
            'name': '流行日语兆赫',
            'count': '6789'
        },

        {
            'name': '流行韩语兆赫',
            'count': '6789'
        }
    ];

    $scope.playMusic = function (){
        audioService.playMusic();
    };

    $scope.nextSong = function (){
        $rootScope.musicPlay.music.url = 'songs/Nice.mp3';
        // $rootScope.musicPlay.img = music.img;
        audioService.nextSong();
    };

    $scope.voice = function (number){
        audioService.voice(number);
    };

    $scope.sound = true;
    $scope.silent = function (){
        $scope.sound = audioService.silent($scope.sound);
    };

}]);

music.controller('RankCtrl', ['$scope', 'audioService', 'rankService', '$interval', function ($scope, audioService, rankService, $interval){

    var categoryRankList = [];

    var list = [
        {
            "id": "42",
            "singer": "凤凰传奇",
            "playtimes": "52887",
            "name": "民族风",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "14",
            "num": 1
        },
        {
            "id": "71",
            "singer": "陈奕迅",
            "playtimes": "2032",
            "name": "见",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "10",
            "num": 2
        },
        {
            "id": "122",
            "singer": "Eminem",
            "playtimes": "1687",
            "name": "Fack",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "3",
            "num": 3
        },
        {
            "id": "21",
            "singer": "刘佳 SARA",
            "playtimes": "1191",
            "name": "美",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "4",
            "num": 4
        },
        {
            "id": "8703",
            "singer": "周天然",
            "playtimes": "975",
            "name": "面具",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 5
        },
        {
            "id": "188",
            "singer": "牛奶咖啡",
            "playtimes": "830",
            "name": "明天",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "0",
            "num": 6
        },
        {
            "id": "9297",
            "singer": "Lorde",
            "playtimes": "599",
            "name": "Royals",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "0",
            "num": 7
        },
        {
            "id": "1800",
            "singer": "张韶涵",
            "playtimes": "551",
            "name": "看",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 8
        },
        {
            "id": "8704",
            "singer": "王麟",
            "playtimes": "499",
            "name": "思密达",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "3",
            "num": 9
        },
        {
            "id": "7145",
            "singer": "初音",
            "playtimes": "498",
            "name": "初音ミクの消失",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 10
        }
    ];
    var musicResult = [
        {
            "id": "42",
            "singer": "凤凰传奇",
            "playtimes": "52887",
            "name": "风",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "14",
            "num": 1
        },
        {
            "id": "71",
            "singer": "陈奕迅",
            "playtimes": "2032",
            "name": "好久不见",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "10",
            "num": 2
        },
        {
            "id": "122",
            "singer": "Eminem",
            "playtimes": "1687",
            "name": "Fack",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "3",
            "num": 3
        },
        {
            "id": "21",
            "singer": "刘佳 SARA",
            "playtimes": "1191",
            "name": "美",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "4",
            "num": 4
        },
        {
            "id": "8703",
            "singer": "周天然",
            "playtimes": "975",
            "name": "面具的谜团",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 5
        },
        {
            "id": "188",
            "singer": "牛奶咖啡",
            "playtimes": "830",
            "name": "天",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "0",
            "num": 6
        },
        {
            "id": "9297",
            "singer": "Lorde",
            "playtimes": "599",
            "name": "Royals",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "0",
            "num": 7
        },
        {
            "id": "1800",
            "singer": "张韶涵",
            "playtimes": "551",
            "name": "看",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 8
        },
        {
            "id": "8704",
            "singer": "王麟",
            "playtimes": "499",
            "name": "思密达",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "3",
            "num": 9
        },
        {
            "id": "7145",
            "singer": "初音未来",
            "playtimes": "498",
            "name": "初音ミクの消失",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 10
        }
    ];
    for(var i=0; i<5; i++){
        categoryRankList[i] = list;
    }
    $scope.cateRankOne = musicResult;
    $scope.cateRankTwo = list;

    // $scope.getRank = function (){
    //     for(var i=0; i<5; i++){
    //         !(function (i){
    //             rankService.getRankList(i).then(function (data){
    //                 categoryRankList.push(data);
    //                 if(i==0){
    //                     $scope.cateRankOne = categoryRankList[i];
    //                 }else if(i==2){
    //                     $scope.cateRankTwo = categoryRankList[i];
    //                 }
    //             });
    //         })(i);
    //     }
    // }
    // $scope.getRank();

    $scope.category = [1,2,3,4,5];
    $scope.cateListOne = 1;
    $scope.cateListTwo = 3;
    $scope.getCategory = function (num){
        if(num<=2){
            $scope.cateListOne = num;
        }else{
            $scope.cateListTwo = num;
        }
        switch(num){
            case 1: $scope.cateRankOne = musicResult;break;
            case 2: $scope.cateRankOne = musicResult;break;
            case 3: $scope.cateRankTwo = categoryRankList[2];break;
            case 4: $scope.cateRankTwo = categoryRankList[3];break;
            case 5: $scope.cateRankTwo = categoryRankList[4];break;
            default: return;
        }
    }

}]);

music.controller('SearchCtrl', ['$scope', function ($scope){
    $scope.musicResult = [
        {
            "id": "42",
            "singer": "凤凰传奇",
            "playtimes": "52887",
            "name": "风",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "14",
            "num": 1
        },
        {
            "id": "71",
            "singer": "陈奕迅",
            "playtimes": "2032",
            "name": "好久不见",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "10",
            "num": 2
        },
        {
            "id": "122",
            "singer": "Eminem",
            "playtimes": "1687",
            "name": "Fack",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "3",
            "num": 3
        },
        {
            "id": "21",
            "singer": "刘佳 SARA",
            "playtimes": "1191",
            "name": "美",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "4",
            "num": 4
        },
        {
            "id": "8703",
            "singer": "周天然",
            "playtimes": "975",
            "name": "面具的谜团",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 5
        },
        {
            "id": "188",
            "singer": "牛奶咖啡",
            "playtimes": "830",
            "name": "天",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "0",
            "num": 6
        },
        {
            "id": "9297",
            "singer": "Lorde",
            "playtimes": "599",
            "name": "Royals",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "0",
            "num": 7
        },
        {
            "id": "1800",
            "singer": "张韶涵",
            "playtimes": "551",
            "name": "看",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 8
        },
        {
            "id": "8704",
            "singer": "王麟",
            "playtimes": "499",
            "name": "思密达",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "3",
            "num": 9
        },
        {
            "id": "7145",
            "singer": "初音未来",
            "playtimes": "498",
            "name": "初音ミクの消失",
            "url": "songs/July.mp3",
            "src": "images/release.jpg",
            "searchtimes": "1",
            "num": 10
        }
    ];
}]);
