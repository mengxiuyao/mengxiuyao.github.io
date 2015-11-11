前一段时间遇到对日期格式化的问题，自己写的比较low，于是去网上淘金，看到了一个大神对js写的扩展，现当个搬砖工如下：
```javascript
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt){
   var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
     for(var k in o)
         if(new RegExp("("+ k +")").test(fmt))
     fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
     return fmt;
 }
 //我写的日期相减
 var meettime = new Date(20140820).Format("yyyy-MM-dd").split("-");
 var currtime = new Date().Format("yyyy-MM-dd").split("-");
  if(currtime[2] >= meettime[2]){
      m_day = currtime[2] - meettime[2];
  }else{
      if(currtime[1] == 0){
          currtime[0]--;
      }
      currtime[1]--;
      m_day = currtime[2] - meettime[2] + 30;
  }

  if(currtime[1] >= meettime[1]){
      m_month = currtime[1] - meettime[1];
  }else{
      currtime[0]--;
      m_month = currtime[1] - meettime[1] + 12;
  }
  m_year = currtime[0] - meettime[0];

  //输入长度判断
  function checklength(str, limit){
      var len = 0;
      for (var i = 0; i < str.length; i++) {
           var a = str.charAt(i);
           if (a.match(/[^\x00-\xff]/ig) != null){
              len += 2;
          }else{
              len += 1;
          }
      }
      return (len>=limit) ? true : false;
  }
```