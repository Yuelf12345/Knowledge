function add(a){
	var num = function(b){
		if(b){
			a = a + b;
			return num;
		}else{ 
			return a;
		}
	}
	num.toString = function(){return a}
	return num;
}


console.log(add(1)(2)(3).toString()); // 输出 6
console.log(add(1)(2)(3)(4).toString()); // 输出 6
