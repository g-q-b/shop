class DetailsCar{
	
	constructor(){
		this.dj2 = document.querySelector(".dj2");
		this.url = "http://localhost:8181/project/libs/goods.json";
		this.init();
		this.addevent();
	}
	
	addevent(){
        var that = this;
		this.dj2.onclick = function(eve){
			var e = eve || window.event;
			var t = e.target || e.which;
			if(t.className == "imgg"){
                that.id = t.parentNode.getAttribute("index");
				that.setData();
			}
		}
	}
	
	setData(){
		this.goods = localStorage.getItem("goods");

		if(this.goods){
			this.goods = JSON.parse(this.goods);

			var onoff = true;
			for(var i=0;i<this.goods.length;i++){

				if(this.goods[i].id == this.id){
					this.goods[i].num++;
					var onoff = false;
				}
			}
			if(onoff){
				this.goods.push({
					id:this.id,
					num:1
				})
			}
		}else{
			this.goods = [{
				id:this.id,
				num:1
			}];
		}
		localStorage.setItem("goods",JSON.stringify(this.goods));
	}

	init(){
		var that = this;
		ajaxGet(this.url,function(res){
            that.res = JSON.parse(res);
			that.display();
		})
	}
	
	display(){
		var str = "";
		for(var i=0;i<this.res.length;i++){
			str += `<div class="box" index="${this.res[i].goodsId}">
						<img src="${this.res[i].src}" />
						<p><a href="http://localhost:8181/project/details.html?goodsID=${this.res[i].goodsId}">${this.res[i].name}</a></p>
						<span>${this.res[i].price}</span>
						<em class="addCar">抢购</em>
					</div>`;					
		}
			// this.count.innerHTML = str;
	}
}

new DetailsCar;
