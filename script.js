function deb (f) {
	let frame;
	return (...params) => {
		if (frame) {
			cancelAnimationFrame(frame);
		}
		frame = requestAnimationFrame(() => {
			f(...params);
		});

	}
};

function storeScroll () {
	document.body.setAttribute("scroll", window.scrollY);
}


function copyText(text) {
	let element = document.querySelector("#_copyText");
	if (!element) {
		element = document.createElement("input");
		element.id = "_copyText";
		element.style.display = "none";
	}

	element.value = text;
	element.select();
	element.setSelectionRange(0, text.length);
	
	navigator.clipboard.writeText(element.value);
}

document.addEventListener("readystatechange", (event) => {
	if (localStorage.getItem("theme") === null) {
		localStorage.setItem("theme", (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"));
	}

	if (localStorage.getItem("theme") == "dark") document.body.setAttribute("darkMode", true)

	document.addEventListener('scroll', deb(storeScroll), { passive: true });
	storeScroll();
});

document.addEventListener("DOMContentLoaded", function () {
	document.addEventListener("click", function (ev) {
		console.log(ev.target.tagName)
		if (ev.target.classList.contains("out-link") || (ev.target.tagName == "A" && ev.target.hasAttribute("href"))) {
			ev.preventDefault();
			document.getElementById("transition").setAttribute("hidden", "false");
			let newWindow = false;
			
			if (newWindow) {
				window.open(ev.target.getAttribute("href"));
			} else {
				setTimeout(function () {
					location.href = ev.target.getAttribute("href");
				}, 700);
			}
		}
	})


	document.getElementById("themeChanger").onclick = function () {
		document.body.toggleAttribute("darkMode")
		localStorage.setItem("theme", (document.body.hasAttribute("darkMode") ? "dark" : "light"))
	}

	
	document.querySelectorAll("h1").forEach(function (el) {
		el.onclick = function () {
			
			let url = new URL(location.href);
			url.search = "";
			url.hash = this.id;
			window.location.hash = this.id;
			copyText(url.toString());
		}
	})

	setTimeout(function () {
		document.getElementById("transition").setAttribute("hidden", "true");
	}, 500);
})