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
let slider = document.querySelector(".section-about__slider");

slider.addEventListener("pointerdown", (e) => {
    slider.style = 'animation-play-state: paused';
    e.target.closest('div').style = 'transform: rotateY(0deg) translateY(-50%); cursor: grabbing';
    slider.addEventListener("pointerup", () => {
        slider.style = 'animation-play-state: running';
        e.target.closest('div').style = '';
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
let main = document.querySelector('main')

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

//Скрытие доступного текста для скролла
let scrollable = document.querySelectorAll(".scrollable");

document.addEventListener('DOMContentLoaded', function(e) {
    scrollable.forEach( function(el) {
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

document.addEventListener('DOMContentLoaded', () => {
    let resBttn = document.querySelectorAll('.section-about__article-resume > a');
    for (el of resBttn) {el.addEventListener('mouseover', resBttn_hover)};

});

//Всплывающие изображения/подсказки
document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".attn > *")) {
        Array.from(e.target.parentElement.children).some((el) => {
            if (e.target == el) {

                let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', 'attn-message');
                svg.setAttribute('viewBox', '0 0 520 290');
                svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                
                let image = document.createElementNS('http://www.w3.org/2000/svg', "image");
                image.setAttribute('href', el.getAttribute('data-img-href'));
                
                let rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
                rect.setAttribute('height', 280);
                rect.setAttribute('width', 480);

                let path = document.createElementNS('http://www.w3.org/2000/svg', "path");

                svg.appendChild(image);
                svg.appendChild(rect);
                svg.appendChild(path);

                document.body.append(svg);

                function onMouseMove(e) {
                    svg.style.top = e.y + 10 + "px";
                    svg.style.left = e.x + 10 + "px";
                };
                function onMouseOut() {
                    svg.remove()
                    el.removeEventListener("mousemove", onMouseMove);
                    el.removeEventListener("mouseout", onMouseOut);
                };

                el.addEventListener("mousemove", onMouseMove);
                el.addEventListener("mouseout", onMouseOut);
            }
        });
    }
});

//Выбор резюме
function resBttn_hover(e) {
    let resBord_grad = document.querySelectorAll('#section-about__article-resume-border_grad stop');
    let resBord_g = document.querySelectorAll('.section-about__article-resume-border g');
    let pointY = [[' 19', ' 42'], [' 13', ' 46']];
    let j = 0;

    if (e.target.closest('a').getAttribute('data-position') == 'left') {
        resBord_grad[1].attributes[1].nodeValue = resBord_grad[0].attributes[1].nodeValue
        resBord_grad[0].attributes[1].nodeValue = 'white';
        for (let i=0; i<2; i++) {
            resBord_g[0].attributes[0].nodeValue = 1;
            resBord_g[0].children[i].attributes[0].nodeValue = resBord_g[0].children[i].attributes[0].nodeValue.replace(/\s(.*?)\d\d{0,}/, pointY[0][i]);
        }
        j = 0;
    } else if (e.target.closest('a').getAttribute('data-position') == 'right') {
        resBord_grad[0].attributes[1].nodeValue = resBord_grad[1].attributes[1].nodeValue
        resBord_grad[1].attributes[1].nodeValue = 'white';
        for (let i=0; i<2; i++) {
            resBord_g[1].attributes[0].nodeValue = 1;
            resBord_g[1].children[i].attributes[0].nodeValue = resBord_g[1].children[i].attributes[0].nodeValue.replace(/\s(.*?)\d\d{0,}/, pointY[0][i]);
        }
        j = 1;
    }

    e.target.closest('a').addEventListener('mouseout', () => {
        resBord_grad[0].attributes[1].nodeValue = resBord_grad[1].attributes[1].nodeValue = '#d1ffff80';
        for (let i=0; i<2; i++) {
            resBord_g[i].attributes[0].nodeValue = 0
            resBord_g[j].children[i].attributes[0].nodeValue = resBord_g[j].children[i].attributes[0].nodeValue.replace(/\s(.*?)\d\d{0,}/, pointY[1][i]);
        };
    });
}

//Скролл контента в секции Skills
let sectionAbilTitle = document.querySelector('.section-abilities__content-title-wrapper');
let sectionAbilContent = document.querySelector('.section-abilities__content-section');
let abilDesc = document.querySelector('.section-abilities__description > .description-wrapper');
const rangeCont = [];

sectionAbilContent.addEventListener('scroll', (e) => {
    let dasd = e.target;
    let posSectionAbilContent = sectionAbilContent.getBoundingClientRect();
    rangeCont.push(posSectionAbilContent.left + (posSectionAbilContent.width / 5));
    rangeCont.push(posSectionAbilContent.left + (posSectionAbilContent.width / 5) * 4);
    
    for (let i = 0; i < sectionAbilContent.children.length; i++) {
        let posEl = sectionAbilContent.children[i].getBoundingClientRect();
        let posCent = posEl.left + (posEl.width / 2);
        if (rangeCont[0] < posCent && posCent < rangeCont[1]) {
            sectionAbilTitle.style.transform = `translateY(${sectionAbilTitle.children[i].getAttribute('data-translateY')})`;
            abilDesc.style.transform = `translateX(${abilDesc.children[i].getAttribute('data-translateX')})`;
        }
    };
});

//Анимация скиллов
let parametr = document.querySelector("#skills-pentagon");

const mapCoupleCP = new Map([
    [/28.515 44.53/g, '27.459 46.008'],
    [/27.66 45.722/g, '26.699 47.082'],
    [/21.735 27.058/g, '19.773 26.462'],
    [/19.459 26.344/g, '17.766 25.817'],
    [/37.5 18/g, '37.5 16.418'],
    [/37.5 15.5/g, '37.5 13.428'],
    [/52.535 27.276/g, '54.21 26.783'],
    [/55.079 26.527/g, '56.962 25.927'],
    [/45.688 43.318/g, '47.02 45.17'],
    [/47.117 45.299/g, '48.574 47.301'],

    [/27.459 46.008/g, '28.515 44.53'],
    [/26.699 47.082/g, '27.66 45.722'],
    [/19.773 26.462/g, '21.735 27.058'],
    [/17.766 25.817/g, '19.459 26.344'],
    [/37.5 16.418/g, '37.5 18'],
    [/37.5 13.428/g, '37.5 15.5'],
    [/54.21 26.783/g, '52.535 27.276'],
    [/56.962 25.927/g, '55.079 26.527'],
    [/47.02 45.17/g, '45.688 43.318'],
    [/48.574 47.301/g, '47.117 45.299'],
]);
document.addEventListener('DOMContentLoaded', async function(e) {
    while(parametr) {
        for (const [key, value] of mapCoupleCP.entries()) {
            if (parametr.attributes[1].nodeValue.search(key) > 0) {
                parametr.attributes[1].nodeValue = parametr.attributes[1].nodeValue.replace(key, value);
                await sleep(40);
            }
        }
        await sleep(3000);
    }
});

// let parametr = document.querySelector(".section-abilities__content-section-skills > foreignObject > div");

// const mapCoupleCP = new Map([
//     [/63.95% 65%/g, '67.8% 70.62%'],
//     [/67.8% 70.62%/g, '63.95% 65%'],
//     [/66% 68%/g, '69.5% 73%'],
//     [/69.5% 73%/g, '66% 68%'],
//     [/75.94% 36.1%/g, '78% 35.4%'],
//     [/78% 35.4%/g, '75.94% 36.1%'],
//     [/73.8% 36.8%/g, '82% 34%'],
//     [/82% 34%/g, '73.8% 36.8%'],
//     [/49.9% 17.12%/g, '49.9% 12%'],
//     [/49.9% 12%/g, '49.9% 17.12%'],
//     [/49.8% 21.25%/g, '49.8% 10.75%'],
//     [/49.8% 10.75%/g, '49.8% 21.25%'],
//     [/22% 35.3%/g, '17% 33.6%'],
//     [/17% 33.6%/g, '22% 35.3%'],
//     [/24.69% 36.3%/g, '17.56% 34%'],
//     [/17.56% 34%/g, '24.69% 36.3%'],
//     [/34% 68%/g, '31.2% 72%'],
//     [/31.2% 72%/g, '34% 68%'],
//     [/35.2% 66.24%/g, '31.2% 72.23%'],
//     [/31.2% 72.23%/g, '35.2% 66.24%'],
// ]);
// document.addEventListener('DOMContentLoaded', async function(e) {
//     while(parametr) {
//         for (const [key, value] of mapCoupleCP.entries()) {
//             if (parametr.style.clipPath.search(key) > 0) {
//                 parametr.style.clipPath = parametr.style.clipPath.replace(key, value);
//                 await sleep(100);
//             }
//         }
//         await sleep(3000);
//     }
// });

//Выбор скилла
let statesDescrTerm = document.querySelectorAll(".description-wrapper__skill .state");
let statesPenta = document.querySelectorAll(".section-abilities__content-section-skills .state");
let pentaGrad = document.querySelector("#skills-pentagon__rad-grad");

document.onmouseover = (e) => parametrClipPath(e, 'mouseout');
document.ontouchstart = (e) => parametrClipPath(e, 'touchend');
let click = false;

const pentagonVertex = [
    [14,1],
    [1,44],
    [37.5,71],
    [74,44],
    [61,1],
];

// const macthClP = [
//     /21.735 27.058 21.991 11.541 37.5 18/g,
//     /28.515 44.53 10.998 40.713 21.735 27.058/g,
//     /37.5 59 28.515 44.53|45.688 43.318/gi,
//     /52.535 27.276 61.957 40.039 45.688 43.318/g,
//     /37.5 18 51.672 13.264 52.535 27.276/g,
// ];

// const replaceClP = {
//     '37.5 59 28.515 44.53' : '37.5 71 27.66 45.722',
//     '45.688 43.318' : '47.117 45.299',
//     '28.515 44.53 10.998 40.713 21.735 27.058' : '27.66 45.722 1 44 19.459 26.344',
//     '21.735 27.058 21.991 11.541 37.5 18' : '19.459 26.344 14 1 37.5 15.5',
//     '37.5 18 51.672 13.264 52.535 27.276' : '37.5 15.5 61 1 55.079 26.527',
//     '52.535 27.276 61.957 40.039 45.688 43.318' : '55.079 26.527 74 44 47.117 45.299',
// };

const macthClP = [
    /21.735 27.058|21.991 11.541|37.5 18/g,
    /28.515 44.53|10.998 40.713|21.735 27.058/g,
    /37.5 59|28.515 44.53|45.688 43.318/gi,
    /52.535 27.276|61.957 40.039|45.688 43.318/g,
    /37.5 18|51.672 13.264|52.535 27.276/g,
];

const replaceClP = {
    '37.5 59' : '37.5 71',
    '28.515 44.53' : '27.66 45.722',
    '45.688 43.318' : '47.117 45.299',
    '10.998 40.713' : ' 1 44',
    '21.735 27.058' : '19.459 26.344',
    '21.991 11.541' : '14 1',
    '37.5 18' : '37.5 15.5',
    '51.672 13.264' : '61 1',
    '52.535 27.276' : '55.079 26.527',
    '61.957 40.039' : '74 44',
};

let detailSoft = document.querySelector(".description-wrapper__skill");
detailSoft.onclick = (e) => {for (st of detailSoft.children) if (e.target.closest(".state") != st) st.open = false};

function parametrClipPath(e, event) {
    if (e.target.className.baseVal == "state" || e.target.closest('.state')) {
        let i = 0;
        Array.from(e.target.closest('.state').parentElement.querySelectorAll('.state')).some((el) => {
            if (e.target.closest('.state') == el) {
                statesPenta[i].onclick = () => {for (st of statesDescrTerm) statesDescrTerm[i] == st ? st.open = !st.open : st.open = false};
                parametr.attributes[1].nodeValue = parametr.attributes[1].nodeValue.replace(macthClP[i], function(matched){
                    return replaceClP[matched];
                });
                return statesDescrTerm[i].style = statesPenta[i].style = "color: var(--color-orange); fill: var(--color-orange);";
            } else {
                i++;
            }
        });
        e.target.addEventListener(event, () => {
            parametr.attributes[1].nodeValue = "M37.5 59 28.515 44.53 10.998 40.713 21.735 27.058 21.991 11.541 37.5 18 51.672 13.264 52.535 27.276 61.957 40.039 45.688 43.318ZM51.672 13.264 37.5 32M21.991 11.541 37.5 32M10.998 40.713 37.5 32M37.5 59 37.5 32M61.957 40.039 37.5 32M37.5 18 37.5 32M21.735 27.058 37.5 32M28.515 44.53 37.5 32M45.688 43.318 37.5 32M52.535 27.276 37.5 32";
            // parametr.attributes[1].nodeValue = "M37.5 59 28.515 44.53 10.998 40.713 21.735 27.058 21.991 11.541 37.5 18 51.672 13.264 52.535 27.276 61.957 40.039 45.688 43.318Z";
            statesDescrTerm[i].style = statesPenta[i].style = "";
        });
    };
};




// let statesDescrTerm = document.querySelectorAll(".description-wrapper__skill .state");
// let statesPenta = document.querySelectorAll(".section-abilities__content-section-skills .state");

// document.onmouseover = (e) => parametrClipPath(e, 'mouseout');
// document.ontouchstart = (e) => parametrClipPath(e, 'touchend');
// let click = false;
// // document.onclick = (e) => click = !click;

// const macthClP = [
//     /49.8% 21.25%, 30.15% 16.45%, 24.69% 36.3%/g,
//     /24.69% 36.3%, 10.73% 58.3%, 35.2% 66.24%/g,
//     /49.8% 75.51%, 63.95% 65%|35.2% 66.24%/gi,
//     /63.95% 65%, 91.2% 59.1%, 73.8% 36.8%/g,
//     /73.8% 36.8%, 66.68% 20.58%, 49.8% 21.25%/g
// ];

// const replaceClP = {
//     '49.8% 21.25%, 30.15% 16.45%, 24.69% 36.3%' : '49.9% 17.12%, 22% 4.5%, 22% 35.3%',
//     '24.69% 36.3%, 10.73% 58.3%, 35.2% 66.24%' : '22% 35.3%, 4.8% 60.4%, 34% 68%',
//     '49.8% 75.51%, 63.95% 65%' : '49.9% 94.7%, 66% 68%',
//     '35.2% 66.24%' : '34% 68%',
//     '63.95% 65%, 91.2% 59.1%, 73.8% 36.8%' : '66% 68%, 95% 60.3%, 75.94% 36.1%',
//     '73.8% 36.8%, 66.68% 20.58%, 49.8% 21.25%' : '75.94% 36.1%, 77.8% 4.5%, 49.9% 17.12%',
// };

// let detailSoft = document.querySelector(".description-wrapper__skill");
// detailSoft.onclick = (e) => {for (st of detailSoft.children) if (e.target.closest(".state") != st) st.open = false};

// function parametrClipPath(e, event) {
//     if (e.target.className.baseVal == "state" || e.target.closest('.state')) {
//         let i = 0;
//         Array.from(e.target.closest('.state').parentElement.querySelectorAll('.state')).some((el) => {
//             if (e.target.closest('.state') == el) {
//                 statesPenta[i].onclick = () => {for (st of statesDescrTerm) statesDescrTerm[i] == st ? st.open = !st.open : st.open = false};
//                 parametr.style.clipPath = parametr.style.clipPath.replace(macthClP[i], function(matched){
//                     return replaceClP[matched];
//                 });
//                 return statesDescrTerm[i].style = statesPenta[i].style = "color: var(--color-orange); fill: var(--color-orange);";
//             } else {
//                 i++;
//             }
//         });
//         e.target.addEventListener(event, () => {
//             parametr.style.clipPath = "polygon(49.8% 75.51%, 63.95% 65%, 91.2% 59.1%, 73.8% 36.8%, 66.68% 20.58%, 49.8% 21.25%, 30.15% 16.45%, 24.69% 36.3%, 10.73% 58.3%, 35.2% 66.24%)";
//             statesDescrTerm[i].style = statesPenta[i].style = "";
//         });
//     };
// };


//Выбор ПО
let softwareSection = document.querySelector(".description-wrapper__software");
let softwareIcon = document.querySelector(".section-abilities__content-section-software");
let descrTitleSoft = document.querySelector(".description-wrapper__software-article-title");
let descrTxtSoft = document.querySelector(".description-wrapper__software-article-description");
let SVG = document.querySelector(".description-wrapper__software-border");

const colTitle_Desc = {
    "HTML-CSS": 'Fluent in HTML, CSS. Freely use grid and flex layout. I know the BEM methodology. As well as without problems layout sites by design with Figma.',
    "JAVASCRIPT": 'Events, object, array.',
    "SASS": 'Creation and formation of style files, their convenient and expedient arrangement.',
    "GIT": 'Working in a team, creating commits.',
    "REACT": 'I don`t fucking know.'
};


softwareIcon.addEventListener('click', async (e) => {
    let targButton = e.target.closest(".icon-button");
    if (!targButton) return;

    for (btn of targButton.offsetParent.children) {
        if (targButton != btn) {
            btn.children[0].children[1].attributes[1].nodeValue = 'M1 1l4 0 1 2 1-2 6 0 2 0 6 0 2 0 6 0 2 2 0 27-28 0-2-2z';
            btn.children[0].children[2].attributes[1].nodeValue = 'M13.5.5l2 0 5 0 2 0z';
            btn.children[0].children[2].style = '';
        }
    }
    targButton.children[0].children[1].attributes[1].nodeValue = 'M1 1l4 0 1 2 1-2 6 0 2 2 6 0 2-2 6 0 2 2 0 27-28 0-2-2z';
    targButton.children[0].children[2].attributes[1].nodeValue = 'M13.5.5l2 2 5 0 2-2z';
    targButton.children[0].children[2].style = 'opacity: 1;';


    abilDesc.children[1].classList.add("software__hidden");
    await sleep(200);

    SVG.children[1].attributes[2].nodeValue = SVG.children[1].attributes[2].nodeValue.replace(/\s(.*?)\d\d{0,}/, ` 48`);
    SVG.children[2].attributes[2].nodeValue = SVG.children[2].attributes[2].nodeValue.replace(/\s{4}.*?\s/, `    7 `);

    await sleep(300);

    SVG.children[0].attributes[2].nodeValue = SVG.children[0].attributes[2].nodeValue.replace(/\d.*?\s/, `160 `);
    SVG.children[0].attributes[2].nodeValue = SVG.children[0].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  6 `);
    SVG.children[0].attributes[2].nodeValue = SVG.children[0].attributes[2].nodeValue.replace(/\s{3}.*?\s/, `   -8 `);
    SVG.children[1].attributes[2].nodeValue = SVG.children[1].attributes[2].nodeValue.replace(/\d.*?\s/, `160 `);
    SVG.children[1].attributes[2].nodeValue = SVG.children[1].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  6 `);
    SVG.children[2].attributes[2].nodeValue = SVG.children[2].attributes[2].nodeValue.replace(/\d.*?\s/, `155 `);
    SVG.children[2].attributes[2].nodeValue = SVG.children[2].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  8 `);
    SVG.children[2].attributes[2].nodeValue = SVG.children[2].attributes[2].nodeValue.replace(/\s{3}.*?\s/, `   4 `);
    SVG.children[2].attributes[2].nodeValue = SVG.children[2].attributes[2].nodeValue.replace(/\s{5}.*?\s/, `     -18 `);

    await sleep(300);

    SVG.children[0].attributes[2].nodeValue = SVG.children[0].attributes[2].nodeValue.replace(/\d.*?\s/, `8 `);
    SVG.children[0].attributes[2].nodeValue = SVG.children[0].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  310 `);
    SVG.children[0].attributes[2].nodeValue = SVG.children[0].attributes[2].nodeValue.replace(/\s{3}.*?\s/, `   -107 `);
    SVG.children[1].attributes[2].nodeValue = SVG.children[1].attributes[2].nodeValue.replace(/\d.*?\s/, `8 `);
    SVG.children[1].attributes[2].nodeValue = SVG.children[1].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  310 `);
    SVG.children[2].attributes[2].nodeValue = SVG.children[2].attributes[2].nodeValue.replace(/\d.*?\s/, `3 `);
    SVG.children[2].attributes[2].nodeValue = SVG.children[2].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  213 `);
    SVG.children[2].attributes[2].nodeValue = SVG.children[2].attributes[2].nodeValue.replace(/\s{3}.*?\s/, `   103 `);
    SVG.children[2].attributes[2].nodeValue = SVG.children[2].attributes[2].nodeValue.replace(/\s{5}.*?\s/, `     -322 `);

    await sleep(300);

    descrTitleSoft.children[0].children[2].innerHTML = '';
    descrTitleSoft.children[0].children[1].attributes[1].nodeValue = targButton.children[1].children[0].attributes[1].nodeValue;
    descrTitleSoft.children[1].innerHTML = targButton.value;
    descrTxtSoft.innerHTML = `<p>${colTitle_Desc[targButton.value]}</p>`;

    let descSize = descrTitleSoft.offsetHeight + descrTxtSoft.offsetHeight;

    SVG.children[1].attributes[2].nodeValue = SVG.children[1].attributes[2].nodeValue.replace(/\s(.*?)\d\d{0,}/, (match) => ` ${Math.floor(+match + (descSize - 44))}`);
    SVG.children[2].attributes[2].nodeValue = SVG.children[2].attributes[2].nodeValue.replace(/\s{4}.*?\s/, (match) => `    ${Math.floor(+match + (descSize - 44))} `);

    await sleep(200);
    abilDesc.children[1].classList.remove("software__hidden");
});


// softwareIcon.addEventListener('click', async (e) => {
//     if (!e.target.closest(".icon-button")) return;

//     abilDesc.children[1].children[1].classList.add("hidden-wrapper_section_software");
//     await sleep(100);

//     SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, ` 75`);
//     SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, ` 115`);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, ` 88`);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{4}.*?\s/, `    20 `);

//     await sleep(300);

//     let wdt = SVG.children[0].attributes[1].nodeValue.match(/\s{2}.*?\s/gi);
//     SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\d.*?\s/, (match) => `${Math.floor(+match + (wdt[0] / 2 - 11))} `);
//     SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  22 `);
//     SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s{3}.*?\s/, `   -10 `);
//     SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\d.*?\s/, (match) => `${Math.floor(+match + (wdt[0] / 2 - 11))} `);
//     SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  22 `);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\d.*?\s/, (match) => `${Math.floor(+match + (wdt[0] / 2 - 11))} `);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  22 `);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{3}.*?\s/, `   6 `);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{5}.*?\s/, `     -38 `);

//     await sleep(300);

//     SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\d.*?\s/, `11 `);
//     SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  300 `);
//     SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s{3}.*?\s/, `   -100 `);
//     SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\d.*?\s/, `11 `);
//     SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  300 `);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\d.*?\s/, `3 `);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  210 `);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{3}.*?\s/, `   96 `);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{5}.*?\s/, `     -316 `);

//     await sleep(300);

//     // abilDesc.children[1].children[1].children[0].children[0].children[4].innerHTML = '';
//     // abilDesc.children[1].children[1].children[0].children[0].children[3].attributes[1].nodeValue = e.target.closest(".icon_button").children[1].children[2].attributes[1].nodeValue;
//     // abilDesc.children[1].children[1].children[0].children[1].innerHTML = e.target.closest(".icon_button").value;
//     // descriptionSoft.innerHTML = `<p>${colTitle_Desc[e.target.closest(".icon_button").value]}</p>`;
    
//     descrTitleSoft.children[0].children[2].innerHTML = '';
//     descrTitleSoft.children[0].children[1].attributes[1].nodeValue = e.target.closest(".icon-button").children[1].children[0].attributes[1].nodeValue;
//     descrTitleSoft.children[1].innerHTML = e.target.closest(".icon-button").value;
//     descrTxtSoft.innerHTML = `<p>${colTitle_Desc[e.target.closest(".icon-button").value]}</p>`;

//     // let descSize = softwareSection.getBoundingClientRect();
//     let descSize = descrTitleSoft.offsetHeight + descrTxtSoft.offsetHeight;

//     SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, (match) => ` ${Math.floor(+match - (descSize / 2 - 37))}`);
//     SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, (match) => ` ${Math.floor(+match + (descSize / 2 - 37))}`);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, (match) => ` ${Math.floor(+match - (descSize / 2 - 37))}`);
//     SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{4}.*?\s/, (match) => `    ${Math.floor(+match + (descSize - 74))} `);

//     await sleep(100);
//     abilDesc.children[1].children[1].classList.remove("hidden-wrapper_section_software");
// });

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
let footer = document.querySelector('footer');
let contacts = document.querySelector('.footer__contacts');
let opened = false;

document.addEventListener('click', async function (e) {
    if (!e.target.closest('.footer__contact-target')) return;

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
// let icons = document.querySelectorAll('.hovering');

// document.addEventListener('mouseover', function(e) {
//     let targEl = e.target.closest('.hovering');
//     // if (!targEl || e.target.className == "hovering") return;
//     if (!targEl) return;
//     for (icon of targEl.offsetParent.children) {
//         if (targEl == icon) {
//             icon.style = "transform: translateZ(1rem) rotateY(6deg);";
//         } else icon.style = "filter: blur(1px)";
//     }
//     targEl.addEventListener('mouseout', function() {
//         for (icon of targEl.offsetParent.children) icon.style = "";
//     })
// });













































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
