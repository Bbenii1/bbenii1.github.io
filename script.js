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
