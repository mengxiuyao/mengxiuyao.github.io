对象的深度克隆
```javascript
	var obj = {
		a:{
			b:{
				f:{
					g:"deep"
				}
			}
		},
		c:{
			d:'wwww'
		},
		e:'qqqq'
	};
	function deepCopy(obj){
		if(typeof obj != "object") return obj;
		var newObj = {};
		for(var attr in obj){
			console.log(attr + ': ' + JSON.stringify(obj[attr]) );
			newObj[attr] = deepCopy(obj[attr]);
		}
		return newObj;
	}
	deepCopy(obj);
```