document.addEventListener('DOMContentLoaded', function () {
	window.scrollTo(0, 0);
	window.location.href="#"

	const open = document.querySelector('opening');
	addTag(open);
});

// Text animation after opening
document.addEventListener("DOMContentLoaded", function () {
	let heading = document.querySelector("h1");
	let text = heading.textContent;
	heading.innerHTML = "";

	text.split("").forEach((letter, index) => {
		let span = document.createElement("span");
		span.textContent = letter;
		span.style.animation = `showup 1s cubic-bezier(0.2, 0.8, 0.25, 1) ${index * 0.1 + 1.3}s forwards`;
		heading.appendChild(span);
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const toggleMenuButton = document.getElementById('menu-button');
	const menu = document.querySelector('menu');
	const html = document.querySelector('html');

	let isButtonBusy = false;

	toggleMenuButton.addEventListener('click', function () {
		if (isButtonBusy) return;
		isButtonBusy = true;

		menu.classList.toggle('active');
		html.classList.toggle('menu-active');
		addTag(menu);

		setTimeout(function () {
			isButtonBusy = false;
		}, 1300);
	});

	document.querySelectorAll('menu a').forEach(link => {
		link.addEventListener('click', function (event) {
			event.preventDefault(); // Prevent immediate navigation

			menu.classList.remove('active');
			html.classList.remove('menu-active');
			addTag(menu);

			setTimeout(() => { // Delay link click to execute animation first
				window.location.href = this.href;
			}, 1000);
		});
	});

	document.addEventListener('keydown', function (e) {
		if (isButtonBusy) return;
		isButtonBusy = true;

		if (e.key === 'Escape' && menu.classList.contains('active')) {
			menu.classList.remove('active');
			html.classList.remove('menu-active');
			addTag(menu);
		}

		setTimeout(function () {
			isButtonBusy = false;
		}, 1300);
	});

	document.addEventListener('click', function (e) {
		if (isButtonBusy) return;
		isButtonBusy = true;

		if (menu.contains(e.target) && !toggleMenuButton.contains(e.target)) {
			menu.classList.remove('active');
			html.classList.remove('menu-active');
			addTag(menu);
		}

		setTimeout(function () {
			isButtonBusy = false;
		}, 1300);
	});
});

//Add html elements for slide animation
function addTag(element){
	element.appendChild(document.createElement('first'));
	element.appendChild(document.createElement('second'));
	element.appendChild(document.createElement('third'));
	if (element.contains(element.querySelector('first'))) {
		setTimeout(() => {
			element.removeChild(element.querySelector('first'));
			element.removeChild(element.querySelector('second'));
			element.removeChild(element.querySelector('third'));
		}, 2000);
	}
}

/*
document.addEventListener('scroll', function () {
	const experienceSection = document.querySelectorAll('#experience');
	const scrollDistance = document.documentElement.scrollHeight - document.querySelector('landing').scrollHeight;
	const minden = document.querySelectorAll('landing, #aboutme');

	const observer = new IntersectionObserver((entries)  => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				//console.log(document.documentElement.scrollTop);
				let valami = 0;
				minden.forEach((element) => {
					valami += element.scrollHeight;
				})
				console.log(valami - (valami - document.documentElement.scrollTop));
			}
		})
	})

	experienceSection.forEach((el) => {
		observer.observe(el);
	});
})*/


/*
document.addEventListener('scroll', function () {
	const experienceSection = document.querySelectorAll('#experience');
	const scrollDistance = document.documentElement.scrollHeight - document.querySelector('landing').scrollHeight;
	const minden = document.querySelectorAll('landing, #aboutme');
	const cards = document.querySelectorAll('.card');
	const mitt = window.scrollY;
	//console.log((mitt / 2) / 100);
	let percent = -2;
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {

				let valami = -127;
				minden.forEach((element) => {
					valami += element.scrollHeight;
				});

				const scrollTop = document.documentElement.scrollTop;
				const minScroll = 0;
				const maxScroll = scrollDistance;
				const normalized = (scrollTop - minScroll) / (maxScroll - minScroll); // [0, 1]
				const percentage = (normalized * 2 - 1); // [-1, 1]

				cards.forEach((card) => {
					card.style.transform = `translate3d(${percentage * 10}px, 0px, 0px)`;
				})
				//console.log(percentage);
			}
		});
	});

	experienceSection.forEach((el) => {
		observer.observe(el);
	});
});*/

document.addEventListener('scroll', function () {
	const experienceSection = document.querySelector('#experience');
	const cards = document.querySelectorAll('.card');
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {

				// Get the experience section position relative to viewport
				const rect = experienceSection.getBoundingClientRect();
				const sectionHeight = experienceSection.scrollHeight;

				// Normalize the value to a range of -20 to 20
				let normalizedValue = ((rect.top / sectionHeight) * -20);
				console.log(normalizedValue);

				cards.forEach((entry) => {
					let direction = entry.getAttribute('direction');
					let speed = entry.getAttribute('speed');
					entry.style.transform = `translate3d(${normalizedValue * (direction * speed)}%, 0, 0)`;
				})
			}
		});
	}, { threshold: [0, 1] }); // Detect when section starts & fully enters view

	observer.observe(experienceSection);
});

