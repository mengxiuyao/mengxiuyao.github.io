几种常见的字符操作，已及快速排序代码如下：

```javascript
	//字符串转成驼峰式
	function stringToCamel(str){
		var arr = str.split('-');
		for(var i=1; i&lt;arr.length; i++){
			arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
		}
		return arr.join('');
	}
	stringToCamel('boder-bottom-color');

	function stringToCamel2(str){

		// w:匹配字符  加()代表一个子项
		var re = /-(\w)/g;
		// $obj: re     $child: (\w)
		return str.replace(re, function ($obj, $child){
			return $child.toUpperCase();
		});
	}
	stringToCamel2('boder-bottom-color');

	//统计字符串中出现最多的字符及其次数
	function totalString(str){
		var obj = {};
		var num = 0;
		var value = '';
		for(var i=0; i&lt;str.length; i++){
			if(!obj[str[i]]){
				obj[str[i]] = [];
			}
			obj[str[i]].push(str[i]);
		}

		for(var attr in obj){
			if(num &lt; obj[attr].length){
				num = obj[attr].length;
				value = obj[attr][0];
			}
		}
		return {num:num, value:value};
	}
	totalString('ssssjjjjjssshhhhssjjjjjjhhhhh');

	function totalString2(str){
		//相同的排序
		str = str.split('').sort().join('');

		var re = /(\w)\1+/g;  //  \1: 表示和前边第一个相同
		var num = 0;
		var value = '';
		str.replace(re, function ($obj, $child){
			if(num &lt; $obj.length){
				num = $obj.length;
				value = $child;
			}
		});

		return {num:num, value:value};
	}
	totalString2('ssssjjjjjssshhhhssjjjjjjhhhhh');

	//如何给数字加千分符
	function addThousand(num){
		num = num.toString();
		var lnum = num.length % 3;
		var pre = '';
		var arr = [];
		var iNow = 0;
		var tmp = '';

		if(lnum != 0 ){
			pre = num.slice(0, lnum);
			arr.push(pre);
		}
		num = num.slice(lnum);
		for(var i=0; i&lt;num.length; i++){
			iNow++
			tmp += num[i];
			if(iNow==3 && tmp){
				arr.push(tmp);
				tmp = '';
				iNow = 0;
			}
		}
		return arr.join(',');
	}
	addThousand(2464567984151);

	function addThousand2(num){
		num = num.toString();

		//   (?=)  :  前向声明
		//   (?!)  :  反前向声明
		var re = /(?=(?!\b)(\d{3})+$)/g;
		return num.replace(re, ',');
	}
	addThousand2(2464567984151);

	//快速排序
	//1.找一个基准点
	//2.建立两个数组，分别存储左边和右边数组
	//3.利用递归进行下次比较 
	function quickSort(arr){
		if(arr.length &lt;= 1){
			return arr;
		}
		var midIndex = Math.floor(arr.length/2);
		var midValue = arr.splice(midIndex, 1)[0];

		var left = [];
		var right = [];

		for(var i=0; i&lt;arr.length; i++){
			if(arr[i] &lt; midValue){
				left.push(arr[i]);
			}else{
				right.push(arr[i]);
			}
		}
		return quickSort(left).concat([midValue], quickSort(right));
	}
	quickSort([1,3,2,9,6,8,4,10]);

```