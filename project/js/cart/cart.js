class Car{
	constructor(){
		this.tbody = document.querySelector("tbody");
		this.btn2 = document.getElementById("btn2");
		this.chk1 = document.querySelector(".tab1 tr.tr1 td.td0 input#chk1")
		// this.chk2 = document.querySelector(".tab2 tr.tr2 td.d0 input#chk2")
		this.url = "http://localhost:8181/project/libs/goods.json";
		this.emp = document.getElementById("emp");
		this.addevent();
		this.init();
		this.init2();
		// this.init3()
	}
	init2(){
		this.btn2.onclick = function(){
			alert("余额不足，无法付款");
		}
	}
	// init3(){
	// 	if(this.chk1.checked){
	// 		()=>{
	// 			this.chk2.checked
	// 		}
	// 	}
	// }
	addevent(){
		var that = this;
		this.tbody.onclick = function(eve){
			var e = eve || window.event;
			var t = e.target || e.srcElement;
			if(t.className == "del"){
				that.id = t.parentNode.getAttribute("index");
				t.parentNode.remove();
				that.setData(function(i){
					that.goods.splice(i,1);
				});
			}
		}
		this.tbody.oninput = function(eve){
			var e = eve || window.event;
			var t = e.target || e.srcElement;
			if(t.className == "changeNum"){
				that.id = t.parentNode.parentNode.getAttribute("index");
				that.setData(function(i){
					that.goods[i].num = t.value;
				});
			}
		}

	}
	setData(callback){
		var that = this;
		for(var i=0;i<this.goods.length;i++){
			if(this.goods[i].id == this.id){
				callback(i);
			}
		}
		localStorage.setItem("goods",JSON.stringify(this.goods));
	}
	init(){
		var that = this;
		ajaxGet(this.url,function(res){
			that.res = JSON.parse(res);
			that.getData();
		})
	}
	getData(){
		this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
		this.display();
	}
	display(){
		var str = "";
		var nums = 0;
		for(var i=0;i<this.res.length;i++){
			for(var j=0;j<this.goods.length;j++){
				if(this.res[i].goodsId == this.goods[j].id){
					str += `<tr index="${this.res[i].goodsId}" class="tr2">
						<td class="d0"><input type="checkbox" id="chk2"/></td>
						<td class="d1"><img src="${this.res[i].src}" alt=""></td>
						<td class="d2">${this.res[i].name}</td>
						<td class="d3">${this.res[i].price}</td>
						<td class="d4"><input type="number" value="${this.goods[j].num}" min=1 class="changeNum"></td>
						<td class="del">
							删除
						</td>
						<td class="d5">${(this.res[i].price * this.goods[j].num)}</td>
					</tr>` ;
					this.emp.style.display = "none";
					nums = (this.res[i].price * this.goods[j].num);
				}
			}
		}
		this.tbody.innerHTML = str;
	}
}

new Car();

