//Анимация появления текста(печать)
function play(past, ms) {
    let logoTitle = descrCont;
    let logoRandom = '';
    let possible = "-+*/|}{[]~\\\":;?/.><=+-_)(*&^%$#@!)}";
    let printLength = 1;

    function generateRandomTitle(i, logoRandom) {
        setTimeout( function() {
        past.textContent = logoRandom;
        }, i*ms );
    }
    for( let i=0; i < logoTitle.length+1; i++ ) {
        logoRandom = logoTitle.substr(0, i);
        if (printLength < logoTitle.length) printLength += 1;
        for( let j=i; j < printLength; j++ ) { 
            logoRandom += possible.charAt(Math.floor(Math.random() * possible.length)); 
        }
        generateRandomTitle(i, logoRandom);
        logoRandom = '';
    }
};

//Горизонтальный скролл
let main = document.querySelector('.main');
let skills = document.querySelector('.container_skills');
let pos = 0;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('click', async function (e) {
    if (!e.target.closest('.btn')) return;
    const node = e.target.parentNode;
    let childPos = [...node.children].indexOf(e.target);

    if (childPos != pos && childPos > pos) {
        main.style.transform = 'translateZ(-20rem)';
        await sleep(500);
        main.style.translate = -100 + 'vw';
        await sleep(700);
        main.style.transform = '';
        pos += 1;
        skills.style.display = "block";
    } else if (childPos != pos && childPos < pos) {
        main.style.transform = 'translateZ(-20rem)';
        await sleep(500);
        main.style.translate = '';
        await sleep(700);
        main.style.transform = '';
        pos -= 1;
        skills.style.display = "none";
    }
});

//Выбор скилла
let parametr = document.querySelector(".parametr")
let states = document.querySelectorAll(".state")
let descrCont;

document.addEventListener('mouseover', function(e) {
    if (e.target.className.baseVal != "state") return;

    if (e.target == states[0]) {
        parametr.style.clipPath = "polygon(49.8% 75.51%, 64% 65%, 91.2% 59%, 73.8% 38%, 67.68% 20.58%, 49.9% 17.12%, 22.2% 4.5%, 20% 36.2%, 10.73% 58.3%, 35.59% 66.24%)"
    } else if (e.target == states[1]) {
        parametr.style.clipPath = "polygon(49.8% 75.51%, 64% 65%, 91.2% 59%, 73.8% 38%, 67.68% 20.58%, 49.8% 21.25%, 29.2% 16.45%, 22% 36.8%, 4.8% 60.3%, 34.8% 67%)"
    } else if (e.target == states[2]) {
        parametr.style.clipPath = "polygon(49.9% 94.7%, 68.3% 72%, 91.2% 59%, 73.8% 38%, 67.68% 20.58%, 49.8% 21.25%, 29.2% 16.45%, 24.69% 37.8%, 10.73% 58.3%, 31.5% 72%)"
    } else if (e.target == states[3]) {
        parametr.style.clipPath = "polygon(49.8% 75.51%, 65% 67.25%, 95% 60.3%, 75.94% 37.5%, 67.68% 20.58%, 49.8% 21.25%, 29.2% 16.45%, 24.69% 37.8%, 10.73% 58.3%, 35.59% 66.24%)"
    } else if (e.target == states[4]) {
        parametr.style.clipPath = "polygon(49.8% 75.51%, 64% 65%, 91.2% 59%, 78% 36.8%, 77.68% 4.5%, 49.9% 14.50%, 29.2% 16.45%, 24.69% 37.8%, 10.73% 58.3%, 35.59% 66.24%)"
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList[0] != "state") return;
    parametr.style.clipPath = "polygon(49.8% 75.51%, 64% 65%, 91.2% 59%, 73.8% 38%, 67.68% 20.58%, 49.8% 21.25%, 29.2% 16.45%, 24.69% 37.8%, 10.73% 58.3%, 35.59% 66.24%)"
});

//Анимация глаза
let x = +bounds.getAttribute('cx');
let y = +bounds.getAttribute('cy');
let dr = +bounds.getAttribute('r') - drag.getAttribute('r');

document.addEventListener('mousemove', function(e) {
    X0 = bounds.getBoundingClientRect().left + +bounds.getAttribute('r');
    Y0 = bounds.getBoundingClientRect().top + +bounds.getAttribute('r');
    let dy = Y0 - e.y;
    let dx = X0 - e.x;
    if (dx*dx + dy*dy < dr*dr) {
        dx = e.offsetX;
        dy = e.offsetY;
    } else {
        let a = Math.atan2(dy, dx);
        dx = x - Math.cos(a)*dr;
        dy = y - Math.sin(a)*dr;
    } 
    drag.setAttribute('transform', `translate(${dx},${dy})`);  
});
document.onmousedown = () => drag.setAttribute('r', `2.5`);
document.onmouseup = () => drag.setAttribute('r', `4`);

//Открытие/закрытие контактов
let footer = document.querySelector('.footer');
let contacts = document.querySelector('.contacts');
let opened = false;

document.addEventListener('click', async function (e) {
    if (!e.target.closest('.contact_target')) return;

    if (opened) {
        footer.style.transform = 'translate3d(0, 12.8rem, 0)';
        await sleep(500);
        contacts.style.display = 'none';
        opened = false;
    } else {
        footer.style.transform = '';
        contacts.style.display = 'grid';
        opened = true;
    }
});

//Анимация наведения на контакты
let icons = document.querySelectorAll('.icon');

document.addEventListener('mouseover', function(e) {
    if ((!e.target.closest('.icon')) || e.target.className == "icon") return;
    
    let targetIcon = e.target.closest('.icon');
    targetIcon.style.transform = "translate3d(0, 0, 4rem)";

    for (icon of icons) {
        if (targetIcon == icon) continue;
        icon.style.filter = "blur(1px)";
    }
    
    targetIcon.addEventListener('mouseout', function() {
        targetIcon.style.transform = "";
        for (icon of icons) {
            if (targetIcon == icon) continue;
            icon.style.filter = "";
        }
    })
});