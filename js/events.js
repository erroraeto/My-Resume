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
    about.scrollIntoView({behavior: "auto"});
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

//Скрытие доступного текста для скролла
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

let elemInnerShadow = document.querySelectorAll(".inner_shadow");
for (el of elemInnerShadow) {filterInnerShdw(el)}

function filterInnerShdw(el) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"><filter id="inner_shadow"><feOffset dx="0" dy="0"/><feGaussianBlur stdDeviation="13"/><feComposite in="SourceAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 .7 0 0 0 0 1 0 0 0 .7 0"/></filter></svg>',
          blob = new Blob([svg], { type: 'image/svg+xml' }),
          url = URL.createObjectURL(blob);
    
    el.style.filter = `url('${url}#inner_shadow')`;
}

//Всплывающие изображения/подсказки
document.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("attn")) {
        Array.from(e.target.closest('.description-text').parentElement.querySelectorAll('.attn')).some((el) => {
            if (e.target == el) {
                let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', 'attn_message');
                svg.setAttribute('viewBox', '0 0 520 290');
                svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                let image = document.createElementNS('http://www.w3.org/2000/svg', "image");
                image.setAttribute('href', el.getAttribute('data-img-href'));
                // image.setAttribute('height', '88%');
                // image.setAttribute('width', '88%');
                // image.setAttribute('x', '6%');
                // image.setAttribute('y', '6%');
                let path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                // path.setAttribute('d', 'M 0 10l10 -10 500 0 10 10 0 270 -10 10 -500 0 -10 -10z');
                filterInnerShdw(path);
                svg.appendChild(image);
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

//Скролл контента в секции Skills
let abilCont = document.querySelector('.conductor_content');
let abilTitle = document.querySelector('.conductor_title > .title_text');
let abilDesc = document.querySelector('.conductor_description > .description_wrapper');
const rangeCont = [];

abilCont.addEventListener('scroll', (e) => {
    let posAbilCont = abilCont.getBoundingClientRect();
    rangeCont.push(posAbilCont.left + (posAbilCont.width / 5));
    rangeCont.push(posAbilCont.left + (posAbilCont.width / 5) * 4);
    
    for (let i = 0; i < abilCont.children.length; i++) {
        let posEl = abilCont.children[i].getBoundingClientRect();
        let posCent = posEl.left + (posEl.width / 2);
        if (rangeCont[0] < posCent && posCent < rangeCont[1]) {
            abilTitle.style.transform = `translateY(${abilTitle.children[i].getAttribute('data-translateY')})`;
            abilDesc.style.transform = `translateX(${abilDesc.children[i].getAttribute('data-translateX')})`;
        }
    };
});

//Анимация скиллов
let parametr = document.querySelector(".parametr");

const mapCoupleCP = new Map([
    [/63.95% 65%/g, '67.8% 70.62%'],
    [/67.8% 70.62%/g, '63.95% 65%'],
    [/66% 68%/g, '69.5% 73%'],
    [/69.5% 73%/g, '66% 68%'],
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
let statesDescrTerm = document.querySelectorAll(".wrapper_section_skill .state");
let statesPenta = document.querySelectorAll(".content_skills > .state");

document.onmouseover = (e) => parametrClipPath(e, 'mouseout');
document.ontouchstart = (e) => parametrClipPath(e, 'touchend');
let click = false;
// document.onclick = (e) => click = !click;

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
    '49.8% 75.51%, 63.95% 65%' : '49.9% 94.7%, 66% 68%',
    '35.2% 66.24%' : '34% 68%',
    '63.95% 65%, 91.2% 59.1%, 73.8% 36.8%' : '66% 68%, 95% 60.3%, 75.94% 36.1%',
    '73.8% 36.8%, 66.68% 20.58%, 49.8% 21.25%' : '75.94% 36.1%, 77.8% 4.5%, 49.9% 17.12%',
};

let detailSoft = document.querySelector(".wrapper_section_skill .description-text");
detailSoft.onclick = (e) => {for (st of detailSoft.children) if (e.target.closest(".state") != st) st.open = false};

function parametrClipPath(e, event) {
    if (e.target.className.baseVal == "state" || e.target.closest('.state')) {
        let i = 0;
        Array.from(e.target.closest('.state').parentElement.querySelectorAll('.state')).some((el) => {
            if (e.target.closest('.state') == el) {
                statesPenta[i].onclick = () => {for (st of statesDescrTerm) statesDescrTerm[i] == st ? st.open = !st.open : st.open = false};
                parametr.style.clipPath = parametr.style.clipPath.replace(macthClP[i], function(matched){
                    return replaceClP[matched];
                });
                return statesDescrTerm[i].style = statesPenta[i].style = "color: #e8be45; fill: #e8be45;";
            } else {
                i++;
            }
        });
        e.target.addEventListener(event, () => {
            parametr.style.clipPath = "polygon(49.8% 75.51%, 63.95% 65%, 91.2% 59.1%, 73.8% 36.8%, 66.68% 20.58%, 49.8% 21.25%, 30.15% 16.45%, 24.69% 36.3%, 10.73% 58.3%, 35.2% 66.24%)";
            statesDescrTerm[i].style = statesPenta[i].style = "";
        });
    };
};



//Выбор ПО
let descriptionSoft = document.querySelector(".wrapper_section_software > .description-text");
let softwareIcon = document.querySelector(".content_software > .container");
let softwareSection = document.querySelector(".wrapper_section_software");
let SVG = document.querySelector(".wrapper_section > .border_software");
// let SVG = document.querySelector(".wrapper_section_software > .border_software");
const svgSoftBord = [];


const sftSelect = {
    "HTML-CSS": 'Fluent in HTML, CSS. Freely use grid and flex layout. I know the BEM methodology. As well as without problems layout sites by design with Figma.',
    "JavaScript": 'Events, object, array.',
    "SASS": 'Creation and formation of style files, their convenient and expedient arrangement.',
    "GIT": 'Working in a team, creating commits.',
    "React": 'I don`t fucking know.'
};

// softwareIcon.addEventListener('click', (e) => {
//     if (!e.target.closest(".icon_button")) return;
//     messageClose();
//     abilDesc.children[1].children[0].children[1].children[0].children[3].attributes[1].nodeValue = e.target.closest(".icon_button").children[1].children[2].attributes[1].nodeValue;
//     abilDesc.children[1].children[0].children[1].children[1].innerHTML = e.target.closest(".icon_button").value;
//     descriptionSoft.innerHTML = `<p>${sftSelect[e.target.closest(".icon_button").value]}</p>`;
//     // messageResize();
//     messageOpen();
// });

softwareIcon.addEventListener('click', async (e) => {
    if (!e.target.closest(".icon_button")) return;

    abilDesc.children[1].children[1].classList.add("hidden-wrapper_section_software");
    await sleep(100);

    SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, ` 75`);
    SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, ` 115`);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, ` 88`);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{4}.*?\s/, `    20 `);

    await sleep(300);

    let wdt = SVG.children[0].attributes[1].nodeValue.match(/\s{2}.*?\s/gi);
    SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\d.*?\s/, (match) => `${Math.floor(+match + (wdt[0] / 2 - 11))} `);
    SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  22 `);
    SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s{3}.*?\s/, `   -10 `);
    SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\d.*?\s/, (match) => `${Math.floor(+match + (wdt[0] / 2 - 11))} `);
    SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  22 `);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\d.*?\s/, (match) => `${Math.floor(+match + (wdt[0] / 2 - 11))} `);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  22 `);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{3}.*?\s/, `   6 `);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{5}.*?\s/, `     -38 `);

    await sleep(300);

    SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\d.*?\s/, `11 `);
    SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  300 `);
    SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s{3}.*?\s/, `   -100 `);
    SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\d.*?\s/, `11 `);
    SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  300 `);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\d.*?\s/, `3 `);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{2}.*?\s/, `  210 `);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{3}.*?\s/, `   96 `);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{5}.*?\s/, `     -316 `);

    await sleep(300);

    abilDesc.children[1].children[1].children[0].children[0].children[3].attributes[1].nodeValue = e.target.closest(".icon_button").children[1].children[2].attributes[1].nodeValue;
    abilDesc.children[1].children[1].children[0].children[1].innerHTML = e.target.closest(".icon_button").value;
    descriptionSoft.innerHTML = `<p>${sftSelect[e.target.closest(".icon_button").value]}</p>`;

    let descSize = softwareSection.getBoundingClientRect();

    SVG.children[0].attributes[1].nodeValue = SVG.children[0].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, (match) => ` ${Math.floor(+match - (descSize.height / 2 - 37))}`);
    SVG.children[1].attributes[1].nodeValue = SVG.children[1].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, (match) => ` ${Math.floor(+match + (descSize.height / 2 - 37))}`);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s(.*?)\d\d{0,}/, (match) => ` ${Math.floor(+match - (descSize.height / 2 - 37))}`);
    SVG.children[2].attributes[1].nodeValue = SVG.children[2].attributes[1].nodeValue.replace(/\s{4}.*?\s/, (match) => `    ${Math.floor(+match + (descSize.height - 74))} `);

    await sleep(100);
    abilDesc.children[1].children[1].classList.remove("hidden-wrapper_section_software");
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
let icons = document.querySelectorAll('.hovering');

document.addEventListener('mouseover', function(e) {
    let targEl = e.target.closest('.hovering');
    if (!targEl || e.target.className == "hovering") return;
    for (icon of targEl.offsetParent.children) {
        if (targEl == icon) {
            icon.style = "transform: translate3d(0, 0, 4rem); filter: contrast(130%) saturate(150%)";
        } else icon.style = "filter: blur(1px)";
    }
    targEl.addEventListener('mouseout', function() {
        for (icon of targEl.offsetParent.children) icon.style = "";
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
