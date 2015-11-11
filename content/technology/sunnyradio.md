##### 最近在用Angular.js写一个网页播放器的系统，视图构建主要是导航栏和ng-view切换区域，audio标签放在body标签内的顶层，以做到背景播放。然后就是基本功能的实现，音乐的播放，暂停，切歌等。每次进行以上操作，正在播放的歌曲信息都会被绑定到$rootScope.music对象中，以便每个子页面都能对其进行操作。

##### 项目链接：[https://github.com/hfutDev/sunnyradio](https://github.com/hfutDev/sunnyradio)
##### 前端效果（未接入数据库）[https://shafley.github.io/learn/musicbox](http://shafley.github.io/learn/musicbox)
##### 部分代码如下：
```javascript
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

    music.factory('audioService', ['$rootScope', '$interval', function ($rootScope, $interval){
        var audio = $('#audio')[0];
        audio.volume = 0.5;

        var factory = {};

        //当定时器完成任务后注销掉
        function endCheck(){
            var audioSrc = audio.src;
            var check = $interval(function(){
                // 播放结束 || 点击暂停
                if(audio.ended || !$rootScope.musicPlay.state) {
                    $rootScope.musicPlay.state = false;
                    $interval.cancel(check);
                }
                console.log('voice: '+audio.volume*100 +'\n'+'timeEnd: '+audio.ended+'\n'+'playing: '+$rootScope.musicPlay.state);
            }, 500);
        }

        //音乐控制面板的播放
        factory.playMusic = function (){
            if($rootScope.musicPlay.state){
                //audio.autoplay=false;
                audio.pause();
                $rootScope.musicPlay.state = false;
            }else{
                //audio.autoplay=true;
                audio.play();
                endCheck();
                $rootScope.musicPlay.state = true;
            }
        };

        //音乐控制面板的下一首
        factory.nextSong = function (){
            audio.src = $rootScope.musicPlay.music.url;
            audio.autoplay=true;
            $rootScope.musicPlay.state = true;
            endCheck();
        };

        factory.nextPlay = function (music){
            if(music.id != $rootScope.musicPlay.music.id){
                $rootScope.musicPlay.music = music;
                factory.nextSong();
            }else{
                factory.playMusic();
            }
        };

        factory.voice = function (number){
            audio.volume = number / 100;
        };

        var voiceNum = 0;
        factory.silent = function (sound){
            if(sound){
                sound = false;
                voiceNum = audio.volume;
                audio.volume = 0;
            }else{
                audio.volume = voiceNum;
                sound = true;
            }
            return sound;
        };

        return factory;
    }]);
```
##### audio的src改变后，需要用autoplay 属性播放，audio.play()不起作用。

##### fanctory中的audio原生API本来是想用变量替换，方便以后的修改，但是发现替换后就不起作用了，比如

    var autoPlay = audio.autoplay;
    var play = audio.play();