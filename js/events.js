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


//Выбор скилла
let parametrs = document.querySelector(".parametrs")
let descrCont;

document.addEventListener('mouseover', function(e) {
    if (e.target.classList[0] != "statuses_state-title") return;

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
    if (e.target.classList[0] != "statuses_state-title") return;
    parametrs.style.clipPath = "polygon(50% 75.51%, 92.19% 58.74%, 67.11% 20.58%, 28.3% 12.95%, 10.73% 58.41%)"
});

document.addEventListener('click', function(e) {
    let descrPast = e.target.nextElementSibling;
    if (JSON.parse(e.target.id)) {
        descrPast.style.animation = "descrHidd .4s ease both";
        e.target.id = false;
        return;
    }
    if (e.target.classList[0] != "statuses_state-title") return;
    descrCont = descrPast.innerHTML;
    descrPast.style.animation = '';
    descrPast.innerHTML = '';
    descrPast.style.display = "block";
    e.target.id = true;
    play(descrPast, 10);
});