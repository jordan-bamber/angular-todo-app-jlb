export function uuid() {
  
  var min = Math.ceil(1);
	var max = Math.floor(999);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}