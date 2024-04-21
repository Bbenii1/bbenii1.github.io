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
		btn.innerHTML = "<i style='width: 16px; height: 16px;' class='bx bxs-sun'></i>"
		btn.value = '0';
	} else if(btn.value == 0){
		btn.innerHTML = "<i style='width: 16px; height: 16px;' class='bx bxs-moon'>"
		btn.value = '1';
	}
}

// definitely my code :3
function init(){
	new SmoothScroll(document,75,20)
}

function SmoothScroll(target, speed, smooth) {
	if (target === document)
		target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body) // cross browser support for document scrolling
      
	var moving = false
	var pos = target.scrollTop
  var frame = target === document.body 
              && document.documentElement 
              ? document.documentElement 
              : target // safari is the new IE
  
	target.addEventListener('mousewheel', scrolled, { passive: false })
	target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

	function scrolled(e) {
		e.preventDefault(); // disable default scrolling

		var delta = normalizeWheelDelta(e)

		pos += -delta * speed
		pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

		if (!moving) update()
	}

	function normalizeWheelDelta(e){
		if(e.detail){
			if(e.wheelDelta)
				return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
			else
				return -e.detail/3 // Firefox
		}else
			return e.wheelDelta/120 // IE,Safari,Chrome
	}

	function update() {
		moving = true
    
		var delta = (pos - target.scrollTop) / smooth
    
		target.scrollTop += delta
    
		if (Math.abs(delta) > 0.5)
			requestFrame(update)
		else
			moving = false
	}

	var requestFrame = function() { // requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	}()
}