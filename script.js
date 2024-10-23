window.onload = function(){
	window.scrollTo(0, 0);
}
function change(){
	const elements = document.querySelectorAll("#body, h2, button, theme-change, card, hr, btn-style");
	elements.forEach(element => element.classList.toggle("bright"));

	const body = document.querySelector("body");
	body.classList.toggle("bright-bg");

	const btn = document.querySelector("button");
	if(btn.value == 1){
		btn.innerHTML = "<i class='bx bxs-sun'></i>"
		btn.value = '0';
	} else if(btn.value == 0){
		btn.innerHTML = "<i class='bx bxs-moon'></i>"
		btn.value = '1';
	}
}