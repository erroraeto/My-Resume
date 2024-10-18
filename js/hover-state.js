let parametrs = document.querySelector(".parametrs")

document.addEventListener('mouseover', function(e) {
    if (e.target.classList[0] != "state") return;

    if (e.target.classList[1] == "one") {
        parametrs.style.clipPath = "polygon(50% 99.5%, 83.99% 56.87%, 66.4% 23.2%, 31.15% 16.32%, 16.43% 56.91%)"
    } else if (e.target.classList[1] == "two") {
        parametrs.style.clipPath = "polygon(50% 70%, 83.99% 56.87%, 66.4% 23.2%, 19.45% .5%, 16.43% 56.91%)"
    } else if (e.target.classList[1] == "three") {
        parametrs.style.clipPath = "polygon(50% 70%, 99.5% 61.8%, 66.4% 23.2%, 31.15% 16.32%, 16.43% 56.91%)"
    } else if (e.target.classList[1] == "four") {
        parametrs.style.clipPath = "polygon(50% 70%, 83.99% 56.87%, 66.4% 23.2%, 31.15% 16.32%, .5% 61.8%)"
    } else if (e.target.classList[1] == "five") {
        parametrs.style.clipPath = "polygon(50% 70%, 83.99% 56.87%, 80.55% .5%, 31.15% 16.32%, 16.43% 56.91%)"
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList[0] != "state") return;
    parametrs.style.clipPath = "polygon(50% 75.51%, 92.19% 58.74%, 67.11% 20.58%, 28.3% 12.95%, 10.73% 58.41%)"
});