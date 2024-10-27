//Анимация появления текста(печать)
function play(past, content, ms) {
    let logoTitle = content;
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
let parametr = document.querySelector(".parametr");
let states = document.querySelectorAll(".state");

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

//Выбор категории
let contSkills = document.querySelector(".container_skills");
let contCircle = document.querySelector(".container_software");
let arrow = document.querySelectorAll(".container_abilities > .arrow");

document.addEventListener('mouseover', function(e) {
    if (!e.target.closest('.container')) return;

    if (e.target.closest('.container_skills')) {
        contSkills.style.filter = "";
        contSkills.style.zIndex = "1";
        contSkills.style.opacity = "1";
        contSkills.style.transform = "translate3d(-50%, -50%, 0)";
        contCircle.style.transform = "translate3d(-10%, -50%, -2rem) scale(0.5)";
        contCircle.style.filter = "blur(2px)";
        contCircle.style.opacity = "0.5";
        contCircle.style.zIndex = "-1";
        arrow[0].style.filter = "blur(2px)";
        arrow[0].style.opacity = "0.5";
        arrow[1].style.filter = "blur()";
        arrow[1].style.opacity = "";
    } else if (e.target.closest('.container_software')) {
        contCircle.style.filter = "";
        contCircle.style.zIndex = "1";
        contCircle.style.opacity = "1";
        contCircle.style.transform = "translate3d(-50%, -50%, 0)";
        contSkills.style.transform = "translate3d(-90%, -50%, -2rem) scale(0.5)";
        contSkills.style.filter = "blur(2px)";
        contSkills.style.opacity = "0.5";
        contSkills.style.zIndex = "1";
        arrow[1].style.filter = "blur(2px)";
        arrow[1].style.opacity = "0.5";
        arrow[0].style.filter = "blur()";
        arrow[0].style.opacity = "";
    }
})


//Выбор ПО
let circle = document.querySelector(".container_software_circle");
let description = document.querySelector(".description");
let software = document.querySelectorAll(".software");
let softwareSlct = document.querySelector("#selected");
let content;
let icon;
let num = {
    i: 0,
    j: 0,
    prev: 0
};

document.addEventListener('mouseover', function(e) {
    if (!e.target.closest('.software')) return;

    if (e.target.closest('.software') == software[0]) {
        software[0].style.transform = "translateZ(4rem) translate(-50%,-50%)";
        software[0].style.opacity = "1";
        circle.children[3].style.filter = "blur()";
        circle.children[3].style.opacity = "1";
        icon = "#HTML-CSS";
        num.i = 3;
        num.j = 0;
        num.prev = 0;
        content = "Fluent in HTML, CSS. Freely use grid and flex layout. I know the BEM methodology. As well as without problems layout sites by design with Figma."
    } else if (e.target.closest('.software') == software[1]) {
        software[1].style.transform = "translateZ(4rem) translate(-50%,-50%)";
        software[1].style.opacity = "1";
        circle.children[4].style.filter = "blur()";
        circle.children[4].style.opacity = "1";
        icon = "#JS";
        num.i = 4;
        num.j = 1;
        num.prev = 1;
        // content = "Fluent in HTML, CSS. Freely use grid and flex layout. I know the BEM methodology. As well as without problems layout sites by design with Figma."
    } else if (e.target.closest('.software') == software[2]) {
        software[2].style.transform = "translateZ(4rem) translate(-50%,-50%)";
        software[2].style.opacity = "1";
        circle.children[5].style.filter = "blur()";
        circle.children[5].style.opacity = "1";
        icon = "#SASS";
        num.i = 5;
        num.j = 2;
        num.prev = 2;
    } else if (e.target.closest('.software') == software[3]) {
        software[3].style.transform = "translateZ(4rem) translate(-50%,-50%)";
        software[3].style.opacity = "1";
        circle.children[1].style.filter = "blur()";
        circle.children[1].style.opacity = "1";
        icon = "#GIT";
        num.i = 1;
        num.j = 3;
        num.prev = 3;
    } else if (e.target.closest('.software') == software[4]) {
        software[4].style.transform = "translateZ(4rem) translate(-50%,-50%)";
        software[4].style.opacity = "1";
        circle.children[2].style.filter = "blur()";
        circle.children[2].style.opacity = "1";
        icon = "#REACT";
        num.i = 2;
        num.j = 4;
        num.prev = 4;
    }

    for (use of softwareSlct.children) use.href.baseVal = icon;
    play(description, content, 25);
});

document.addEventListener('mouseout', function(e) {
    if (!e.target.closest('.software')) return;
    
    software[num.j].style.transform = "";
    software[num.j].style.opacity = "0.6";
    circle.children[num.i].style.opacity = "0.6";
    circle.children[num.i].style.filter = "blur(1px)";
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