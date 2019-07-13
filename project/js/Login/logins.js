var obtn = document.getElementById("btn");
var ochk = document.getElementById("chk");
var ospan = document.querySelector(".check input#btn1")
var login = JSON.parse(getCookie("login"));

obtn.onclick = function(){
    var ouser = document.getElementById("user");
    var opass = document.getElementById("pass");
    if(ouser.value == login.user && opass.value == login.pass){
        setCookie("login",JSON.stringify({user:ouser.value,pass:opass.value,code:1}),{expires:7});
        window.location.href = "http://localhost:8181/project/index.html";
    }else{
        alert("登陆失败");
    }
}

ospan.onclick = function(){
    if(ochk.checked){
        removeCookie("login",{expires:0});
        alert("注销成功")
        window.location.href = "http://localhost:8181/project/index.html";
    }
}
