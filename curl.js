//登录 北邮人论坛  
var http=require("http");  
var querystring=require("querystring");  
  //username=userbak&password=user*^@12!bak&server_id=${server_id}&submit=true
var contents=querystring.stringify({  
  username:'userbak',
  password:'user*^@12!bak',
  server_id:'1',
  submit:'true'
});  
var options={  
    host:"cy.com",  
    path:"/admin/account/login",  
    method:"post",  
    headers:{  
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",  
        "Content-Length":contents.length,         
        "Accept":"application/json, text/javascript, */*; q=0.01",  
        "Accept-Language":"zh-cn",  
        "Cache-Control":"no-cache",  
        "Connection":"Keep-Alive",    
        "Host":"cy.com",  
        "Referer":"http://cy.com/index",  
        "User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)",  
        "X-Requested-With":"XMLHttpRequest"  
    }  
};  
  console.log(options);
var req=http.request(options,function(res){  
    res.setEncoding("utf8");  
    console.log(res.statusCode);
    console.log(res.headers.location);
    res.on("data",function(data){  
        console.log(data);  
    });  
});  
  
  
req.write(contents);  
req.end();  