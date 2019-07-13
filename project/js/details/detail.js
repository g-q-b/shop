$(function(){
    //获取url中的参数
 function getUrlParam(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
     var r = window.location.search.substr(1).match(reg);  //匹配目标参数
     if (r != null) return unescape(r[2]); return null; //返回参数值
 }

 //接收URL中的参数booksId
 var id = getUrlParam('goodsID');
 var url = "http://localhost:8181/project/libs/goods.json";

 ajaxGet(url,function(res){
     res = JSON.parse(res);
     display(res);
 })
 
 function display(res){
     var str = "";
     for(var i=0;i<res.length;i++){
         if(id == res[i].goodsId){
             str += 
                 `<div class="boxl">
                     <img src="${res[i].src}" class="img1"/>
                     <span></span>
                     <p></p>
                 </div>
                 <div class="boxl1">
                     <img src="${res[i].src}" class="img2"/>
                 </div>
                 <div class="box" index="${res[i].goodsId}">
                         <div class="box-r">
                             <p>${res[i].name}</p>
                             <span>单价：${res[i].price}</span>
                             <b>详情：舒适，有利于睡眠，居家必备!!!</b>
                             <img src="../project/img/20.png" class="img2"/>
                             <em class="addCar">加入购物车</em>
                         <div>
                 </div>`;					
         }
     }   
     $("#details").append(str);
     new Magnifier();
 }    
})

