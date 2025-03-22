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
    main.style.scrollBehavior = "auto";
    // skill.scrollIntoView({behavior: "auto"});
    // home.scrollIntoView({behavior: "auto"});
    home.scrollIntoView({inline: "center", behavior: "auto"});
    main.style.scrollBehavior = "";
}

//Отмена контекстного меню элементам с анимацией
let notContMenu = document.querySelectorAll("#nCM");
for (el of notContMenu) el.oncontextmenu = () => {return false};

//Отмена контекстного меню slider
// let slider = document.querySelector(".section-about__slider");

// slider.addEventListener("pointerdown", (e) => {
//     slider.style = 'animation-play-state: paused';
//     e.target.closest('div').style = 'transform: rotateY(0deg) translateY(-50%); cursor: grabbing';
//     slider.addEventListener("pointerup", () => {
//         slider.style = 'animation-play-state: running';
//         e.target.closest('div').style = '';
//     });
// });
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

//Подсказки списка
let attnSctAbt = document.querySelector(".attn");

attnSctAbt.addEventListener("click", (e) => {
    if (e.target.closest(".attn > *")) {
        viewSection.scrollTo({
            top: snapVals[snapVals.length - e.target.getAttribute('data-frame')],
            behavior: "smooth",
        });
        [viewSectionFrame[snapVals.length - e.target.getAttribute('data-frame')], attnSctAbt].forEach( el => el.classList.add('frame-tickMark'));

        e.target.onmouseout = () => {
            [viewSectionFrame[snapVals.length - e.target.getAttribute('data-frame')], attnSctAbt].forEach( el => el.classList.remove('frame-tickMark'));
        }
    }
});

//Выбор резюме
let formSliderCont = document.querySelector('.form-slider__button-content');
let formSliderBtn = document.querySelectorAll('.form-slider__button button');
let formSliderRadio = document.querySelectorAll('.form-slider__radio input');

document.addEventListener('DOMContentLoaded', () => {


    for (btn of formSliderBtn) {
        btn.addEventListener('click', (event) => {

            let content = event.target.parentElement.querySelectorAll('p');
            let radioCheck = event.target.parentElement.parentElement.querySelector('input:checked');

            switch (event.target.title) {
                case 'Previous':
                    for (ctn of content) {
                        if (ctn.dataset.view !== undefined && ctn.previousElementSibling !== null) {
                            delete ctn.dataset.view;
                            formSliderCont.scrollLeft = -(formSliderCont.scrollWidth / content.length);
                            ctn.previousElementSibling.dataset.view = '';
                            break
                        };
                    };
                    break
                case 'Next':
                    for (ctn of content) {
                        if (ctn.dataset.view !== undefined && ctn.nextElementSibling !== null) {
                            delete ctn.dataset.view;
                            formSliderCont.scrollLeft = (formSliderCont.scrollWidth / content.length);
                            ctn.nextElementSibling.dataset.view = '';
                            break
                        };
                    };
                    break
            }
        });
    };

    const observer = new IntersectionObserver( (entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.5) {
                ctn.dataset.view = '';
                Array.from(formSliderRadio).find((radio) => {if (radio.value == entry.target.textContent) radio.checked = true})
            } else if (entry.intersectionRatio <= 0.5) {
                delete ctn.dataset.view;
            }
        })
        }, {
            root: formSliderCont,
            threshold: 0.5,
        }
    );

    for (ctn of formSliderCont.children) observer.observe(ctn);

    for (radio of formSliderRadio) {
        radio.addEventListener('click', (event) => {
            for (ctn of formSliderCont.children) {
                if (ctn.textContent == event.target.value) {
                    ctn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                    ctn.dataset.view = '';
                } else {delete ctn.dataset.view};
            }
        });
    };
});






let sliderAbout = document.querySelector(".section-about__slider-wrapper"),
sliderBrdTtl = document.querySelector(".section-about__slider-border .section-about__slider-title"),
sliderBrd = document.querySelector(".section-about__slider-border");

const observerSliderSVG = new ResizeObserver((entries) => {
    for (const entry of entries) {
        if (entry.target.parentElement.checkVisibility()) {
            let parent = entry.target.parentElement;
            entry.target.attributes[1].nodeValue = `0 0 ${Math.round(parent.offsetWidth)} ${Math.round(parent.offsetHeight)}`;

            let titleWidth = entry.target.children[2].scrollWidth,
            numWidth = entry.target.children[4].scrollWidth;

            entry.target.children[1].attributes[1].nodeValue = entry.target.children[1].attributes[1].nodeValue.replace(/\b\s{2}\d+/, `  ${Math.round(parent.offsetWidth - titleWidth - 55)}`);

            entry.target.children[1].attributes[1].nodeValue = entry.target.children[1].attributes[1].nodeValue.replace(/\b\s{3}\d+/, `   ${Math.round(titleWidth + 23)}`);

            entry.target.children[1].attributes[1].nodeValue = entry.target.children[1].attributes[1].nodeValue.replace(/\b\s{4}\d+/, `    ${Math.round(parent.offsetHeight - 32)}`);
            entry.target.children[1].attributes[1].nodeValue = entry.target.children[1].attributes[1].nodeValue.replace(/\s\-\d+/, ` -${Math.round(parent.offsetWidth - 12)}`);

            entry.target.children[2].attributes[0].nodeValue = Math.round(parent.offsetWidth - 22);

            entry.target.children[3].attributes[1].nodeValue = entry.target.children[3].attributes[1].nodeValue.replace(/\d+/, Math.round(parent.offsetWidth - titleWidth - 46));
            entry.target.children[3].attributes[1].nodeValue = entry.target.children[3].attributes[1].nodeValue.replace(/\s\-\d+/, ` -${Math.round(numWidth + 9)}`);
            
            entry.target.children[4].attributes[0].nodeValue = Math.round(parent.offsetWidth - titleWidth - 46 - numWidth / 2);

            entry.target.children[5].attributes[0].nodeValue = Math.round(parent.offsetWidth - titleWidth - 56 - numWidth);

        }
    }
});

// observerSliderSVG.observe(sliderBrd);

for (svg of sliderAbout.querySelectorAll('svg')) observerSliderSVG.observe(svg);

//-----------------------------------------------------------------------------------------------------------------------------------

let viewSection = document.querySelector('.section-about__slider');
let viewSectionWrapp = document.querySelector('.section-about__slider-wrapper');
let viewSectionFrame = document.querySelectorAll('.section-about__slider-wrapper-frame');

let lastPos = Math.round(viewSection.scrollTop),
lastTimeStamp = 0,
zSpacing = 200,
perspective = 600,
zVals = [],
snapVals = [];

for(let i = 0; i < viewSectionFrame.length; i++) {
    zVals.push( i * zSpacing );

    // snapVals.push( i * ( ( viewSection.scrollHeight - viewSection.clientHeight ) / 8) );
    snapVals.push( Math.round( i * ( ( viewSection.scrollHeight - viewSection.clientHeight ) / 8.09) ));
    // snapVals.push( (i + 0.25) * zSpacing );
};

viewSection.addEventListener('scroll', (event) => {
    let top = Math.round(viewSection.scrollTop),
    delta = lastPos - top;
    lastPos = top;

    for (let i = 0; i < viewSectionFrame.length; i++) {
        let newZVal = zVals[i] += delta * 1.5;
        viewSectionFrame[i].style.setProperty("--translateZ", newZVal);

        viewSectionFrame[i].style.setProperty("--translateX", newZVal > 8 ? '100' : '-50');

        let blur = Math.round(-parseInt( newZVal / perspective * 200 ) / 50);
        viewSectionFrame[i].style.filter = `blur(${blur}px)`;

        let opacity = newZVal < 7 ? 2 - -parseInt( newZVal / perspective * 30 ) / 50 : 1 - parseInt( newZVal / perspective * 50 ) / 10;
        viewSectionFrame[i].style.opacity = +opacity;

    };

    event.target.onclick = (event) => {
        let target = event.target.closest('.section-about__slider-wrapper-frame');
        if (!target) return;

        const index = target ? [...target.parentNode.children].indexOf(target) : -1;
        viewSection.scrollTo({
            top: snapVals[index],
            behavior: "smooth",
        });
    };

});

let isDownViewSection,
lastDragState = 0,
scrollTop,
startX;

viewSection.addEventListener('mousedown', (event) => {

    viewSection.classList.add('frame-grabbing');
    isDownViewSection = true;
    scrollTop = viewSection.scrollTop;
    startX = event.pageX - viewSection.offsetLeft;

    event.target.onmousemove = (event) => {
        if (isDownViewSection) {
            const x = event.pageX - viewSection.offsetLeft;
            const walkX = x - startX;
            viewSection.scrollTop = scrollTop - walkX;
        }
    };

    viewSection.onmouseleave = viewSection.onmouseup = () => {
        viewSection.classList.remove('frame-grabbing');
        isDownViewSection = false;
    };
});

document.addEventListener('DOMContentLoaded', () => {
    viewSection.scrollTo(0, viewSection.scrollHeight);
});

//-----------------------------------------------------------------------------------------------------------------------------------

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

//Выбор скилла
let statesDescrTerm = document.querySelectorAll(".description-wrapper__skill-details .state");
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

let detailSoft = document.querySelector(".description-wrapper__skill-details");
// detailSoft.onclick = (e) => {for (st of detailSoft.children) if (e.target.closest(".state") != st) st.open = false};
detailSoft.onclick = (e) => {
    for (let i=0; i<statesDescrTerm.length; i++) {
        if (statesDescrTerm[i] == e.target.closest(".state")) {
            statesDescrTerm[i].classList.toggle('skill-desc__select');
            statesPenta[i].classList.toggle('skill__select');
        } else {
            statesDescrTerm[i].open = false;
            statesDescrTerm[i].classList.remove('skill-desc__select');
            statesPenta[i].classList.remove('skill__select');
        }
    }
};

function parametrClipPath(e, event) {
    // if (e.target.className.baseVal == "state" || e.target.closest('.state')) {
    // if (e.target.className.baseVal == "state") {
    if (e.target.closest('.state')) {
        let i = 0;
        Array.from(e.target.closest('.state').parentElement.querySelectorAll('.state')).some((el) => {
            if (e.target.closest('.state') == el) {
                // statesPenta[i].onclick = () => {for (st of statesDescrTerm) statesDescrTerm[i] == st ? st.open = !st.open : st.open = false};
                statesPenta[i].onclick = () => {
                    for (st of statesDescrTerm) {
                        if (statesDescrTerm[i] == st) {
                            st.open = !st.open;
                            st.classList.toggle('skill-desc__select');
                        } else {
                            st.open = false;
                            st.classList.remove('skill-desc__select');
                        }
                    }
                    for (st of statesPenta) statesPenta[i] == st ? st.classList.toggle('skill__select') : st.classList.remove('skill__select');
                };
                parametr.attributes[1].nodeValue = parametr.attributes[1].nodeValue.replace(macthClP[i], function(matched){
                    return replaceClP[matched];
                });
                statesPenta[i].style = "color: var(--color-fern-crayola);";
                return statesDescrTerm[i].children[0].children[0].style = "filter: hue-rotate(-74deg);";
            } else {
                i++;
            }
        });
        e.target.addEventListener(event, () => {
            parametr.attributes[1].nodeValue = "M37.5 59 28.515 44.53 10.998 40.713 21.735 27.058 21.991 11.541 37.5 18 51.672 13.264 52.535 27.276 61.957 40.039 45.688 43.318ZM51.672 13.264 37.5 32M21.991 11.541 37.5 32M10.998 40.713 37.5 32M37.5 59 37.5 32M61.957 40.039 37.5 32M37.5 18 37.5 32M21.735 27.058 37.5 32M28.515 44.53 37.5 32M45.688 43.318 37.5 32M52.535 27.276 37.5 32";
            statesDescrTerm[i].children[0].children[0].style = statesPenta[i].style = "";
        });
    };
};


let SVGdescSkill = document.querySelector(".description-wrapper__skill-border"),
SVGdetailTitleSoft = detailSoft.querySelectorAll('summary svg'),
SVGdetailDescSoft = detailSoft.querySelectorAll('p svg');

const observerSkillSection = new ResizeObserver((entries) => {
    for (const entry of entries) {
        let detail = entry.target.closest('details'),
        summary = detail.children[0].children[1],
        SVGTitle = detail.children[0].children[0],
        desc = detail.children[1].children[0],
        SVGdesc = detail.children[1].children[0];


        if (entry.target.closest('summary svg')) {
            SVGTitle.attributes[1].nodeValue = `0 0 ${Math.round(SVGTitle.clientWidth)} ${Math.round(SVGTitle.clientHeight)}`;
            SVGTitle.children[0].attributes[1].nodeValue = SVGTitle.children[0].attributes[1].nodeValue.replace(/\d+/, `1`);
    
            SVGTitle.children[0].attributes[1].nodeValue = SVGTitle.children[0].attributes[1].nodeValue.replace(/\b\s{2}\S+/, `  ${Math.round(SVGTitle.clientWidth - 18)}`);
            SVGTitle.children[0].attributes[1].nodeValue = SVGTitle.children[0].attributes[1].nodeValue.replace(/\s\-\d+/, ` -${Math.round(SVGTitle.clientWidth - (summary.offsetWidth + summary.offsetLeft) - 14)}`);
            SVGTitle.children[0].attributes[1].nodeValue = SVGTitle.children[0].attributes[1].nodeValue.replace(/\s{2}\-\d+/, `  -${Math.round(summary.offsetWidth + summary.offsetLeft)}`);
    
            SVGTitle.children[0].attributes[1].nodeValue = SVGTitle.children[0].attributes[1].nodeValue.replace(/\b\s{3}\d+/, `   ${Math.round(SVGTitle.clientHeight - 9)}`);
        } else if (entry.target.closest('p svg')) {
            SVGdesc.attributes[1].nodeValue = `0 0 ${Math.round(desc.clientWidth)} ${Math.round(desc.clientHeight)}`;

            SVGdesc.children[0].attributes[1].nodeValue = SVGdesc.children[0].attributes[1].nodeValue.replace(/\b\s{2}\d+/, `  ${Math.round(summary.offsetWidth + summary.offsetLeft)}`);
            SVGdesc.children[0].attributes[1].nodeValue = SVGdesc.children[0].attributes[1].nodeValue.replace(/\b\s{3}\d+/, `   ${Math.round(desc.clientWidth - (summary.offsetWidth + summary.offsetLeft) - 20)}`);
            SVGdesc.children[0].attributes[1].nodeValue = SVGdesc.children[0].attributes[1].nodeValue.replace(/\s\-\d+/, ` -${Math.round(desc.clientWidth - 12)}`);

            SVGdesc.children[0].attributes[1].nodeValue = SVGdesc.children[0].attributes[1].nodeValue.replace(/\b\s{4}\d+/, `    ${Math.round(desc.clientHeight - 9)}`);
        }
    }
});

for (svg of SVGdetailTitleSoft) observerSkillSection.observe(svg);
for (svg of SVGdetailDescSoft) observerSkillSection.observe(svg);


let SVGContSkill = document.querySelectorAll(".button-state__border");
let skillSectionCont = document.querySelectorAll(".button-state");

(function () {
    for (border of SVGContSkill) {
        border.attributes[1].nodeValue = `0 0 ${Math.round(border.clientWidth)} ${Math.round(border.clientHeight)}`;
        border.children[0].attributes[0].nodeValue = border.children[0].attributes[0].nodeValue.replace(/10/g, Math.round((border.clientWidth / 2) - 10));

        border.children[1].attributes[0].nodeValue = border.children[1].attributes[0].nodeValue.replace(/\S+\l/, `${Math.round(border.clientHeight - 13)}l` );
        border.children[1].attributes[0].nodeValue = border.children[1].attributes[0].nodeValue.replace(/10/g, Math.round((border.clientWidth / 2) - 10));

        border.children[2].attributes[0].nodeValue = border.children[2].attributes[0].nodeValue.replace(/\d.*?\b/, Math.round((border.clientWidth / 2) - 7));

        border.children[3].attributes[0].nodeValue = border.children[3].attributes[0].nodeValue.replace(/\d.*?\b/, Math.round((border.clientWidth / 2) - 7));
        border.children[3].attributes[0].nodeValue = border.children[3].attributes[0].nodeValue.replace(/\S+\l/, `${Math.round(border.clientHeight - 16)}l` );
    }
})();

//Выбор ПО
let softwareSection = document.querySelector(".description-wrapper__software");
let softwareIcon = document.querySelector(".section-abilities__content-section-software");

let descrWrapSoft = document.querySelector(".description-wrapper__software-article");
let descrTitleSoft = document.querySelector(".description-wrapper__software-article-title");
let descrTxtSoft = document.querySelector(".description-wrapper__software-article-description");

let SVGdescSoft = document.querySelector(".description-wrapper__software-border");

let SVGdescSoftTitle = document.querySelector(".description-wrapper__software-border #description-wrapper__software-border-1");
let SVGdescSoftDesc = document.querySelector(".description-wrapper__software-border #description-wrapper__software-border-2");
let SVGdescSoftBg = document.querySelector(".description-wrapper__software-border rect");

let SVGdescSoftTxt = document.querySelectorAll(".description-wrapper__software-border text");

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

    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\s\d+/, ` ${Math.round(descrWrapSoft.offsetTop + descrWrapSoft.offsetHeight / 2 - 10)}`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\b\s{5}\S+/, `     15`);


    await sleep(300);

    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\d+/, `${Math.round(descrTitleSoft.offsetWidth / 2 - 30)}`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\b\s{2}\S+/, `  45`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\b\s{3}\S+/g, `   0`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\b\s{4}\S+/, `    0`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\s\-\d+/, ` -45`);

    await sleep(300);

    descrTitleSoft.children[0].children[2].innerHTML = '';
    descrTitleSoft.children[0].children[1].attributes[1].nodeValue = targButton.children[1].children[0].attributes[1].nodeValue;
    descrTitleSoft.children[1].innerHTML = targButton.value;
    descrTxtSoft.innerHTML = `<p>${colTitle_Desc[targButton.value]}</p>`;

    resizeSoftDescr();

    await sleep(500);
    abilDesc.children[1].classList.remove("software__hidden");
});


async function resizeSoftDescr() {

    SVGdescSoft.attributes[1].nodeValue = `0 0 ${Math.round(SVGdescSoft.clientWidth)} ${Math.round(SVGdescSoft.clientHeight)}`;

    SVGdescSoftTitle.attributes[2].nodeValue = SVGdescSoftTitle.attributes[2].nodeValue.replace(/\s\d+/, ` ${Math.round(descrWrapSoft.offsetTop + 12)}`);
    SVGdescSoftTitle.attributes[2].nodeValue = SVGdescSoftTitle.attributes[2].nodeValue.replace(/\d+/, `1`);
    SVGdescSoftTitle.attributes[2].nodeValue = SVGdescSoftTitle.attributes[2].nodeValue.replace(/\b\s{2}\S+/, `  ${Math.round(descrTitleSoft.offsetWidth - 26)}`);
    SVGdescSoftTitle.attributes[2].nodeValue = SVGdescSoftTitle.attributes[2].nodeValue.replace(/\s\-\d+/, ` -${Math.round(descrWrapSoft.offsetWidth / 3 - 6)}`);
    SVGdescSoftTitle.attributes[2].nodeValue = SVGdescSoftTitle.attributes[2].nodeValue.replace(/\s{2}\-\d+/, `  -${Math.round(descrWrapSoft.offsetWidth / 3 * 2 - 14)}`);
    
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\d+/, `12`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\b\s{2}\S+/, `  ${Math.round(descrWrapSoft.offsetWidth / 3 - 15)}`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\b\s{3}\S+/g, `   15`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\b\s{4}\S+/, `    ${Math.round(descrWrapSoft.offsetWidth / 3 * 2 - 52)}`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\s\-\d+/, ` -${Math.round(descrWrapSoft.offsetWidth - 37)}`);
    
    await sleep(300);
    SVGdescSoftBg.attributes[1].nodeValue = Math.round(descrWrapSoft.offsetTop - 60);
    SVGdescSoftBg.attributes[2].nodeValue = Math.round(descrWrapSoft.offsetWidth);
    SVGdescSoftBg.attributes[3].nodeValue = Math.round(descrWrapSoft.offsetHeight + 120);;
    SVGdescSoftTitle.attributes[2].nodeValue = SVGdescSoftTitle.attributes[2].nodeValue.replace(/\b\s{3}\d+/, `   ${Math.round(descrTitleSoft.offsetHeight - 25)}`);
    SVGdescSoftTitle.attributes[2].nodeValue = SVGdescSoftTitle.attributes[2].nodeValue.replace(/\s\d+/, ` ${Math.round(descrWrapSoft.offsetTop + 15)}`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\s\d+/, ` ${Math.round(descrWrapSoft.offsetTop - 10)}`);
    SVGdescSoftDesc.attributes[2].nodeValue = SVGdescSoftDesc.attributes[2].nodeValue.replace(/\b\s{5}\S+/, `     ${Math.round(descrWrapSoft.offsetHeight + 20)}`);

    for (text of SVGdescSoftTxt) {
        text.attributes[0].nodeValue = Math.round(descrWrapSoft.offsetWidth / 7);
        text.attributes[1].nodeValue = descrWrapSoft.offsetTop - 8;
    }
};


resizeSoftDescr();

let sectionAbil = document.querySelector('.section-abilities__content');
let sectionAbilSVG = document.querySelector('.section-abilities__content-border');

const resizerSVG = new ResizeObserver((entries) => {
    for (const entry of entries) {
        if (entry.target.classList.contains('section-abilities__content')) {

            sectionAbilSVG.attributes[1].nodeValue = `0 0 ${Math.round(sectionAbil.clientWidth)} ${Math.round(sectionAbil.clientHeight)}`;

            sectionAbilSVG.children[1].attributes[1].nodeValue = sectionAbilSVG.children[1].attributes[1].nodeValue.replace(/\s\d+/, ` ${Math.round(sectionAbil.clientHeight - 29)}`);
            sectionAbilSVG.children[3].attributes[2].nodeValue = sectionAbilSVG.children[3].attributes[2].nodeValue.replace(/\b\s{3}\d+/, `   ${Math.round(sectionAbil.clientHeight - 73)}`);

            sectionAbilSVG.children[0].attributes[1].nodeValue = sectionAbilSVG.children[0].attributes[1].nodeValue.replace(/\B\M\S+/, `M${Math.round(sectionAbil.clientWidth / 5.2)}`);
            sectionAbilSVG.children[0].attributes[1].nodeValue = sectionAbilSVG.children[0].attributes[1].nodeValue.replace(/\B\L\S+/, `L${Math.round(sectionAbil.clientWidth - (sectionAbil.clientWidth / 5.2) - 29)}`);

            sectionAbilSVG.children[0].attributes[1].nodeValue = sectionAbilSVG.children[0].attributes[1].nodeValue.replace(/\b\s{2}\S+/, `  ${Math.round(sectionAbil.clientWidth - 73)}`);
            sectionAbilSVG.children[1].attributes[1].nodeValue = sectionAbilSVG.children[1].attributes[1].nodeValue.replace(/\b\s{2}\S+/, `  ${Math.round(sectionAbil.clientWidth - 73)}`);
            sectionAbilSVG.children[3].attributes[2].nodeValue = sectionAbilSVG.children[3].attributes[2].nodeValue.replace(/\b\s{2}\S+/, `  ${Math.round(sectionAbil.clientWidth - 238)}`);
            sectionAbilSVG.children[3].attributes[2].nodeValue = sectionAbilSVG.children[3].attributes[2].nodeValue.replace(/\s\-\d+/, `  -${Math.round(sectionAbil.clientWidth - 106)}`);

        }
    }
});


resizerSVG.observe(sectionAbil);

//Анимация глаза
// let x = +bounds.getAttribute('cx');
// let y = +bounds.getAttribute('cy');
// let dr = +bounds.getAttribute('r') - drag.getAttribute('r');

// document.addEventListener('mousemove', function(e) {
//     X0 = bounds.getBoundingClientRect().left + +bounds.getAttribute('r');
//     Y0 = bounds.getBoundingClientRect().top + +bounds.getAttribute('r');
//     let dy = Y0 - e.y;
//     let dx = X0 - e.x;
//     if (dx*dx + dy*dy < dr*dr) {
//         dx = e.offsetX;
//         dy = e.offsetY;
//     } else {
//         let a = Math.atan2(dy, dx);
//         dx = x - Math.cos(a)*dr;
//         dy = y - Math.sin(a)*dr;
//     } 
//     drag.setAttribute('transform', `translate(${dx},${dy})`);  
// });
// document.onmousedown = () => drag.setAttribute('r', `2.5`);
// document.onmouseup = () => drag.setAttribute('r', `4`);

//Открытие/закрытие контактов
// let footer = document.querySelector('footer');


let footer = document.querySelector('.thumb');
let contacts = document.querySelector('.footer__contacts');
let opened = false;

document.addEventListener('click', async function (e) {
    if (!e.target.closest('.footer__contact-target')) return;

    if (opened) {
        // footer.style.transform = 'translate3d(0, 13rem, 0)';
        footer.style.setProperty("--translateY", 13);
        await sleep(500);
        contacts.style.display = 'none';
        opened = false;
    } else {
        // footer.style.transform = '';
        footer.style.setProperty("--translateY", 0);
        contacts.style.display = 'grid';
        opened = true;
    }
});

// document.body.addEventListener('scroll', (event) => {
main.addEventListener('scroll', (event) => {

    let body = event.target,
    scrollThumbPos = (body.offsetWidth * body.scrollLeft) / body.scrollWidth,
    scrollThumbCenter = body.offsetWidth / (body.scrollWidth / body.offsetWidth) / 2,
    footerCenter = footer.attributes[1].nodeValue / 2;
    // footerCenter = footer.width.baseVal.value / 2;
    // footerCenter = footer.offsetWidth / 2;

    footer.style.setProperty("--translateX", scrollThumbPos + scrollThumbCenter - footerCenter);

});

let footerIsDown,
footerStartX,
footerSnap = [],
footerScrollLeft;

document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < (main.scrollWidth / main.offsetWidth); i++) { footerSnap.push( main.offsetWidth * i ) }
});

footer.addEventListener('mousedown', (event) => {

    document.body.style = 'user-select: none';
    // let body = document.body;
    let body = main;
    footerIsDown = true;
    footerStartX = event.clientX;
    footerScrollLeft = body.scrollLeft;


    document.onmousemove = (event) => {
        if (footerIsDown) {
            const x = event.clientX;
            const walkX = (x - footerStartX) * body.scrollWidth / body.offsetWidth;
            body.classList.add('main-scrolling');
            body.scrollLeft = footerScrollLeft + walkX;
        }
    };

    document.onmouseup = async () => {
        footerIsDown = false;
        let equal = footerSnap.reduce((nearest, num) => Math.abs(num - body.scrollLeft) >= Math.abs(nearest - body.scrollLeft) && nearest < num? nearest : num);
        body.scrollTo({
            left: equal,
            behavior: "smooth",
        });
        await sleep(500);
        body.classList.remove('main-scrolling');
    };

});

let footerOp = document.querySelector('.open-footer'),
footerTru = document.querySelector('footer'),
footerContent = document.querySelectorAll('footer a span');

// footerOp.addEventListener('click', async () => {
//     footerTru.classList.add('opened');
//     await sleep(200);
//     for (a of footerContent) {
//         textTyping(a, 100, a.getAttribute('data-text'));
//     }
// });

// footerTru.addEventListener('click', () => {
//     footerTru.classList.remove('opened');
//     for (a of footerContent) {
//         textTyping(a, 30)
//     }
// });





let navBar = document.querySelector('nav svg'),
navBarBg = navBar.querySelectorAll('.bgrnd > *:not(.thumb)'),
navBarThumb = navBar.querySelector('.bgrnd > .thumb'),
navBarCntnt = navBar.querySelectorAll('.cntnt text');

const observerNavBar = new ResizeObserver((entries) => {
    for (const entry of entries) {
        navBar.attributes[0].nodeValue = `0 0 ${navBar.clientWidth} ${navBar.clientHeight}`;

        // for (const bg of navBarBg) {
        for (let i=0; i<navBarBg.length; i++) {

            if (i == 0) {
                navBarThumb.attributes[2].nodeValue = navBar.clientHeight;
            }

            navBarBg[i].attributes[0].nodeValue = navBarCntnt[i].textLength.baseVal.value * 1.2;
            navBarBg[i].attributes[1].nodeValue = navBarCntnt[i].clientHeight * 1.2;
            // navBarBg[i].attributes[0].nodeValue = navBarCntnt[i].textLength.baseVal.value;
            // navBarBg[i].attributes[1].nodeValue = navBarCntnt[i].clientHeight;

            navBarBg[i].attributes[2].nodeValue = navBar.clientWidth / 3 * (i + .5) - (navBarBg[i].attributes[0].nodeValue / 2);
            navBarBg[i].attributes[3].nodeValue = navBar.clientHeight / 2 - (navBarBg[i].attributes[1].nodeValue / 2);
            // navBarBg[i].attributes[2].nodeValue = navBar.clientWidth / 3 * (i + .5);

            navBarCntnt[i].attributes[2].nodeValue = navBar.clientWidth / 3 * (i + .5);
        }

    }
});

observerNavBar.observe(navBar);






































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
