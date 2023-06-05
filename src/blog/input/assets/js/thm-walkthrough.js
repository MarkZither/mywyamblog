const revealAnswerLinks = document.querySelectorAll(".reveal-answer > a");

window.onload = (event) => {
    console.log("page is fully loaded");

    for (var i = 0; i < revealAnswerLinks.length ; i++) {
        revealAnswerLinks[i].addEventListener("click", 
            function (event) {
                event.preventDefault();
                event.stopPropagation();
                this.parentNode.previousElementSibling.querySelector("p").classList.remove("blur");
            }, 
            false);
    }
};
