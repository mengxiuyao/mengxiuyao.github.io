这几天面试中，遇到了几个js常见的方法

##### 1.数组去重
    function unique1( arr ){
        for ( var i = 0; i < arr.length; i ++ ){
            for ( var j = i + 1; j < arr.length; j ++ ){
                if ( arr[i] == arr[j] ){
                    arr.splice( j, 1 );
                }
            }
        }
        return arr;
    }
    unique([1, 2, 3, 1, 2]); //[1, 2, 3]

    function unique2(arr)
    {
        var n = []; //一个新的临时数组
        for(var i = 0; i < arr.length; i++) //遍历当前数组
        {
            //如果当前数组的第i已经保存进了临时数组，那么跳过，
            //否则把当前项push到临时数组里面
            if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
        }
        return n;
    }
    unique2([1, 2, 3, 1, 2]); //[1, 2, 3];

##### 2.对一个函数传入若干一维个数组，返回一个二维数组，将传入的每个数组的下标相同的元素放到同一个字数组中，方法如下：
    function zip(){
        var arr = arguments;
        var newarr = [];
        for(var i=0; i< arr[0].length; i++){
            var temp = [];
            for(var j=0; j< arr.length; j++){
                temp.push(arr[j][i]);
            }
            newarr.push(temp);
        }
        return newarr;
    }
    zip(['fred', 'barney','jkasjk','hdjsah'], [30, 40,20,10], [true, false,'jjj', 'kkk'],['fred', 'barney','jkasjk','hdjsah']);
    //输出
    [
        ['fred',30,true,'fred'],
        ['barney', 40,false,'barney'],
        ['jkasjk',20,'jjj','jkasjk'],
        ['hdjsah',10,'kkk','hdjsah']
    ]

##### 3.对一句话中的变量表达式进行替换
    String.prototype.render = function(option){
        var s = this, reg;
        Object.keys(option).forEach(function(k){
            reg = new RegExp("\\$\\("+k+"\\)","g");
            s = s.replace(reg,option[k])
        });
        return s;
    };

    var greeting = 'my name is $(name),age $(age)';
    var result = greeting.render({name:'XiaoMing',age:11});
    console.log(result); // my name is XiaoMing,age 11