//Анимация появления текста(перебор)
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
    for (let i=0; i < logoTitle.length+1; i++) {
        logoRandom = logoTitle.substr(0, i);
        if (printLength < logoTitle.length) printLength += 1;
        for( let j=i; j < printLength; j++ ) { 
            logoRandom += possible.charAt(Math.floor(Math.random() * possible.length)); 
        }
        generateRandomTitle(i, logoRandom);
        logoRandom = '';
    }
};
//Анимация появления/исчезновение текста(typing/delete)
let undo,
    typing;
async function textTyping(doc, speed, txt) {
    undo = true;
    await sleep(10);
    if (txt) {
        undo = false;
        let i = 0;
        let logoRandom = '';
        while (i < txt.length && !undo) {
            logoRandom += txt.charAt(i);
            doc.innerHTML = logoRandom;
            i++;
            await sleep(speed);
        }
    } else if (!txt) {
        while (0 != doc.innerHTML.length) {
            doc.innerHTML = doc.innerHTML.slice(0, -1);
            await sleep(speed);
        }
    }
};

//Функция задержки
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
//Прокрутка к основному фрейму
window.onload = function() {
    document.all[0].style.scrollBehavior = "auto";
    skill.scrollIntoView({behavior: "auto"});
    // home.scrollIntoView({behavior: "auto"});
    document.all[0].style.scrollBehavior = "";
}

//Скролл по id
document.addEventListener('click', async function (e) {
    if (e.target.id != "btn") return;
    let containerChoosed = document.getElementById(e.target.closest('#btn').hash.replace(/#/g, ''));
    containerChoosed.scrollIntoView({ behavior: 'smooth' });
});

//Отмена контекстного меню элементам с анимацией
let notContMenu = document.querySelectorAll("#nCM");
for (el of notContMenu) el.oncontextmenu = () => {return false};

//Отмена контекстного меню slider
let slider = document.querySelector(".slider");

slider.addEventListener("pointerdown", (e) => {
    slider.style = 'animation-play-state: paused';
    e.target.closest('.slider_frame').style = 'transform: rotateY(0deg) translateY(-50%); cursor: grabbing';
    slider.addEventListener("pointerup", () => {
        slider.style = 'animation-play-state: running';
        e.target.closest('.slider_frame').style = '';
    });
});
// slider.oncontextmenu = function(event) {
//     event.preventDefault();
//     // event.stopPropagation();
//     return false;
// };
// slider.addEventListener('touchmove', () => document.addEventListener('touchmove', handleTouchMove, false), false);
// slider.addEventListener("touchend", (event) => event.preventDefault(), false);
// slider.addEventListener("touchstart", tapHandler);

// let tapedTwice = false;

// function tapHandler(event) {
//     if(!tapedTwice) {
//         tapedTwice = true;
//         setTimeout( function() { tapedTwice = false; }, 300 );
//         return false;
//     }
//     event.preventDefault();
// };


//Свайпы секций
let main = document.querySelector('.main')

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
    main.children;
    main.children.length;
};

let tochScrollPos = 2;

function handleTouchMove(evt) {
    // if ( evt.target.closest('#nCM') ) return;
    if ( ! xDown || ! yDown ) return;

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    // немного поясню здесь. Тут берутся модули движения по оси абсцисс и ординат (почему модули? потому что если движение сделано влево или вниз, то его показатель будет отрицательным) и сравнивается, чего было больше: движения по абсциссам или ординатам. Нужно это для того, чтобы, если пользователь провел вправо, но немного наискосок вниз, сработал именно коллбэк для движения вправо, а ни как-то иначе.
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            /* left swipe */
            if (--main.children.length > tochScrollPos) ++tochScrollPos;
        } else {
            /* right swipe */
            if (0 < tochScrollPos) --tochScrollPos;
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }
    }
    xDown = null;
    yDown = null;
    console.log(tochScrollPos);
    main.children[tochScrollPos].scrollIntoView({ behavior: 'smooth' });
};

//Scroll описания о себе
let desc = document.querySelectorAll(".description-text");

document.addEventListener('DOMContentLoaded', function(e) {
    desc.forEach( function(el) {
        if (el.scrollHeight > el.clientHeight) {
            el.style.maskImage = "linear-gradient(to bottom, transparent, #000 0%, #000 70%, transparent 100%)";
            el.addEventListener('scroll', () => {
                let descScrollTop = Math.floor(( el.scrollTop * 100) / el.scrollHeight);
                let descScrollBot = Math.floor(( (el.scrollTop + el.clientHeight) * 100) / el.scrollHeight);

                if (descScrollTop < 30) {
                    el.style.maskImage = el.style.maskImage.replace(el.getAttribute('data-mask-value-top'), `${descScrollTop}%`);
                    el.setAttribute('data-mask-value-top', `${descScrollTop}%`);
                }
                if (descScrollBot > 70) {
                    el.style.maskImage = el.style.maskImage.replace(el.getAttribute('data-mask-value-bot'), `${descScrollBot}%`);
                    el.setAttribute('data-mask-value-bot', `${descScrollBot}%`);
                }
            });
        }
    });
});



let abilCont = document.querySelector('.container_content');
let abilTitle = document.querySelector('.container_conductor > .title > .title_text');
let abilDesc = document.querySelector('.container_conductor > .description > .description_wrapper');
const rangeCont = [];


abilCont.addEventListener('scroll', (e) => {
    let posAbilCont = abilCont.getBoundingClientRect();
    rangeCont.push(posAbilCont.left + (posAbilCont.width / 5));
    rangeCont.push(posAbilCont.left + (posAbilCont.width / 4) * 4);
    
    for (let i = 0; i < abilCont.children.length; i++) {
        let posEl = abilCont.children[i].getBoundingClientRect();
        let posCent = posEl.left + (posEl.width / 2);
        if (rangeCont[0] < posCent && posCent < rangeCont[1]) {
            abilTitle.style.transform = `translateY(${abilTitle.children[i].getAttribute('data-translateY')})`;
            abilDesc.style.transform = `translateX(${abilDesc.children[i].getAttribute('data-translateX')})`;
        }
    };
});






















//Выбор категории
let contAbil = document.querySelector(".container_abilities");
let contSkills = document.querySelector(".container_skills");
let contSoft = document.querySelector(".container_software");
let skillsTitul = document.querySelectorAll(".container_skills_status > text");
const skills = [
    "Problem Solving",
    "Research",
    "Fast Learner",
    "Team Work",
    "Communication",
    "0",
    ".3",
    ".6",
    "1",
];
let prevTarg;

document.addEventListener('pointerup', function(e) {
    if (!e.target.closest('.container')) return;
    let targ = e.target.closest('#nCM');

    if (targ.className == "container_skills" && targ != prevTarg) {
        contAbil.classList.add("contSkills");
        contAbil.classList.remove("contSoft", "hover_abil");
        document.onmouseover = (e) => parametrClipPath(e, 'mouseout');
        document.ontouchstart = (e) => parametrClipPath(e, 'touchend');
        for (let i = 0; i < skillsTitul.length; i++) {
            textTyping(skillsTitul[i], 100, skills[i]);
        };
        selectSoft();
    } else if (targ.className == "container_software" && targ != prevTarg) {
        contAbil.classList.add("contSoft");
        contAbil.classList.remove("contSkills", "hover_abil");
        document.onmouseover = (e) => selectSoft(e);
        document.ontouchstart = (e) => selectSoft(e);
        for (el of skillsTitul) {
            textTyping(el, 50);
        }
    }

    if (targ == prevTarg) {
        contAbil.classList.remove("contSoft", "contSkills");
        contAbil.classList.add("hover_abil");
        selectSoft();
        for (el of skillsTitul) {
            textTyping(el, 100);
        }
    }

    prevTarg = prevTarg == targ ? 0 : targ;
})


//Анимация скиллов
let parametr = document.querySelector(".parametr");

const mapCoupleCP = new Map([
    [/63.95% 65%/g, '67.8% 70.62%'],
    [/67.8% 70.62%/g, '63.95% 65%'],
    [/66.7% 69%/g, '69.5% 73%'],
    [/69.5% 73%/g, '66.7% 69%'],
    [/75.94% 36.1%/g, '78% 35.4%'],
    [/78% 35.4%/g, '75.94% 36.1%'],
    [/73.8% 36.8%/g, '82% 34%'],
    [/82% 34%/g, '73.8% 36.8%'],
    [/49.9% 17.12%/g, '49.9% 12%'],
    [/49.9% 12%/g, '49.9% 17.12%'],
    [/49.8% 21.25%/g, '49.8% 10.75%'],
    [/49.8% 10.75%/g, '49.8% 21.25%'],
    [/22% 35.3%/g, '17% 33.6%'],
    [/17% 33.6%/g, '22% 35.3%'],
    [/24.69% 36.3%/g, '17.56% 34%'],
    [/17.56% 34%/g, '24.69% 36.3%'],
    [/34% 68%/g, '31.2% 72%'],
    [/31.2% 72%/g, '34% 68%'],
    [/35.2% 66.24%/g, '31.2% 72.23%'],
    [/31.2% 72.23%/g, '35.2% 66.24%'],
]);
document.addEventListener('DOMContentLoaded', async function(e) {
    while(parametr) {
        for (const [key, value] of mapCoupleCP.entries()) {
            if (parametr.style.clipPath.search(key) > 0) {
                parametr.style.clipPath = parametr.style.clipPath.replace(key, value);
                await sleep(100);
            }
        }
        await sleep(3000);
    }
});

//Выбор скилла
let states = document.querySelectorAll(".state");

const macthClP = [
    /49.8% 21.25%, 30.15% 16.45%, 24.69% 36.3%/g,
    /24.69% 36.3%, 10.73% 58.3%, 35.2% 66.24%/g,
    /49.8% 75.51%, 63.95% 65%|35.2% 66.24%/gi,
    /63.95% 65%, 91.2% 59.1%, 73.8% 36.8%/g,
    /73.8% 36.8%, 66.68% 20.58%, 49.8% 21.25%/g
];

const replaceClP = {
    '49.8% 21.25%, 30.15% 16.45%, 24.69% 36.3%' : '49.9% 17.12%, 22% 4.5%, 22% 35.3%',
    '24.69% 36.3%, 10.73% 58.3%, 35.2% 66.24%' : '22% 35.3%, 4.8% 60.4%, 34% 68%',
    '49.8% 75.51%, 63.95% 65%' : '49.9% 94.7%, 66.7% 69%',
    '35.2% 66.24%' : '34% 68%',
    '63.95% 65%, 91.2% 59.1%, 73.8% 36.8%' : '66.7% 69%, 95% 60.3%, 75.94% 36.1%',
    '73.8% 36.8%, 66.68% 20.58%, 49.8% 21.25%' : '75.94% 36.1%, 77.8% 4.5%, 49.9% 17.12%',
};

// document.addEventListener('mouseover', function(e) {
//     parametrClipPath(e, 'mouseout');
// });
// document.addEventListener('touchstart', function(e) {
//     parametrClipPath(e, 'touchend');
// });

function parametrClipPath(e, event) {
    if (e.target.className.baseVal == "state") {
        let i = 0;
        states.forEach((el) => {
            if (e.target == el) {
                parametr.style.clipPath = parametr.style.clipPath.replace(macthClP[i], function(matched){
                    return replaceClP[matched];
                })
            } else {
                i++;
            }
        })
        e.target.addEventListener(event, () => {
            parametr.style.clipPath = "polygon(49.8% 75.51%, 63.95% 65%, 91.2% 59.1%, 73.8% 36.8%, 66.68% 20.58%, 49.8% 21.25%, 30.15% 16.45%, 24.69% 36.3%, 10.73% 58.3%, 35.2% 66.24%)";
        });
    };

    if (!contAbil.classList.contains("contSkills")) parametr.style.clipPath = '';
};

//Выбор ПО
let description = document.querySelector(".description");
let software = document.querySelectorAll(".container_software_penta > g");
let softTrg = '';

const sftSelect = [
    'Fluent in HTML, CSS. Freely use grid and flex layout. I know the BEM methodology. As well as without problems layout sites by design with Figma.',
    'Events, object, array.',
    'Creation and formation of style files, their convenient and expedient arrangement.',
    'Working in a team, creating commits.',
    'I don`t fucking know.'
];
const marginDescr = [
    '30%',
    '46%',
    '39%',
    '44%',
    '44%'
];


function selectSoft(elEvent) {
    if (!elEvent && softTrg) {
        description.innerHTML = "";
        softTrg.classList.remove("sel_soft");
        return softTrg = "";
    };
    if (elEvent && elEvent.target.closest('.container_software_penta > g')) {
        let targ = elEvent.target.closest('.container_software_penta > g');
        let i = 0;
        for (let i=0;i<software.length;i++) {
            if (targ == software[i] && softTrg != targ) {
                textTyping(description, 10, sftSelect[i]);
                description.style = `margin-top: ${marginDescr[i]}`;
                targ.classList.add("sel_soft");
                if (softTrg) softTrg.classList.remove("sel_soft");
                softTrg = targ;
            }
        }
    };
};



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
        footer.style.transform = 'translate3d(0, 13rem, 0)';
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













































//Построение фигуры по кординатам элементам animateMotion
// let crc = document.querySelectorAll(".crc");
// let pnta = document.querySelector("#pnta");
// let losta = document.querySelector("#losta");
// const map1 = new Map();
// const crcCord = new Map();

// document.addEventListener('DOMContentLoaded', async function() {
//     while(true) {
//         pnta.attributes.d.value = "M";
//         crcCord.clear();
//         for (let i=0;i<crc.length;i++) {
//             let crcPos = losta.getScreenCTM().inverse().multiply( crc[i].getScreenCTM() );
//             x = crcPos.e;
//             y = crcPos.f;
//             crcCord.set(x, y);
//         };
//         let key = crcCord.keys();
//         let val = crcCord.values();
//         for (let i=0;i<crcCord.size;i++) {
//             pnta.attributes.d.value += `${key.next().value}, ${val.next().value} `;
//         };
//         pnta.attributes.d.value += "z";
//         await sleep(20);
//     };
// });
