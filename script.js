const split = id => {
    const element = document.getElementById(id),
            text = element.innerText.split("");

    element.innerText = "";

    text.forEach(letter =>{
        const span = document.createElement("span");
        span.className = "letter";
        span.innerText = letter;
        element.appendChild(span);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    split("inst_blast");
    split("git_blast");
    split("dis_blast");
});

function change(){
	const elements = document.querySelectorAll("#body, h2, #git_blast, #inst_blast, #dis_blast, button");
	elements.forEach(element => element.classList.toggle("bright"));

	const body = document.querySelector("body");
	body.classList.toggle("bright-bg");

	const h1 = document.querySelector("h1");
	h1.classList.toggle("bright-h1");

	const btn = document.querySelector("button");
	if(btn.value == 1){
		btn.innerHTML = "<i class='bx bxs-sun'></i>"
		btn.value = '0';
	} else if(btn.value == 0){
		btn.innerHTML = "<i class='bx bxs-moon'></i>"
		btn.value = '1';
	}
}