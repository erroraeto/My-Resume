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
    // skill.scrollIntoView({behavior: "auto"});
    home.scrollIntoView({behavior: "auto"});
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

//Всплывающие изображения/подсказки

let popoverSctAbt = document.querySelector("#popover-img__section-about");
let popoverSctAbtSVG = document.querySelector("#popover-img__section-about svg");
let popoverSctAbtImg = document.querySelector("#popover-img__section-about image");

document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".attn > *")) {
        popoverSctAbt.showPopover();

        // e.target.onmousemove = (e) => popoverSctAbt.style.transform = `translate(${e.pageX + 10}px, ${e.pageY + 10}px)`;
        popoverSctAbtImg.setAttribute('href', e.target.getAttribute('data-img-href'));

        e.target.onmouseout = () => popoverSctAbt.hidePopover();
    }


});

// document.addEventListener('mousemove', function(event) {
//     if (event.target.closest('.attn')) {
//         let i = popoverSctAbt.getBoundingClientRect(),
//           x = Math.round(i.left + (i.width / 2)),
//           y = Math.round(i.top + (i.height / 2));
      
//         x = (x - event.screenX);
//         y = (y - event.screenY);
    
//         popoverSctAbt.style.transform = 'rotatex(' + y/30 + 'deg)';   
//         popoverSctAbt.style.transform += 'rotateY(' + -x/30 + 'deg)';
        
//         if ( y < 0 && x > 0 || y > 0 && x < 0 ) {
//             popoverSctAbt.style.transform += 'rotateZ(' + -Math.abs(x-y)/10000 + 'deg)';
//         } else if ( y > 0 && x > 0 || y < 0 && x < 0 ) {
//             popoverSctAbt.style.transform += 'rotateZ(' + Math.abs(x-y)/10000 + 'deg)';
//         }
//     };
// });


document.addEventListener("mousemove", (e) => {
  rotateElement(e, popoverSctAbt);
});

function rotateElement(event, element) {
  // get mouse position
  const x = event.clientX;
  const y = event.clientY;
  // console.log(x, y)

  // find the middle
  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;
  // console.log(middleX, middleY)

  // get offset from middle as a percentage
  // and tone it down a little
  const offsetX = ((x - middleX) / middleX) * 45;
  const offsetY = ((y - middleY) / middleY) * 45;
  // console.log(offsetX, offsetY);

  // set rotation
  element.style.setProperty("--rotateX", offsetX + "deg");
  element.style.setProperty("--rotateY", -1 * offsetY + "deg");
}



const observerSVGDoc01 = new ResizeObserver((entries) => {
    for (const entry of entries) {
        // if (entry.contentBoxSize) {
        if (entry.target.parentElement.checkVisibility()) {
            let parent = entry.target.parentElement;
            entry.target.attributes[0].nodeValue = `0 0 ${Math.round(parent.offsetWidth)} ${Math.round(parent.offsetHeight)}`;

            entry.target.children[0].attributes[1].nodeValue = entry.target.children[0].attributes[1].nodeValue.replace(/\b\s{2}\d+/, `  ${Math.round(parent.offsetWidth / 3 * 2 - 22)}`);
            entry.target.children[0].attributes[1].nodeValue = entry.target.children[0].attributes[1].nodeValue.replace(/\b\s{3}\d+/, `   ${Math.round(parent.offsetWidth / 3 - 10)}`);
            entry.target.children[0].attributes[1].nodeValue = entry.target.children[0].attributes[1].nodeValue.replace(/\b\s{4}\d+/, `    ${Math.round(parent.offsetHeight - 22)}`);
            entry.target.children[0].attributes[1].nodeValue = entry.target.children[0].attributes[1].nodeValue.replace(/\s\-\d+/, ` -${Math.round(parent.offsetWidth - 12)}`);
        }
    }
});

observerSVGDoc01.observe(popoverSctAbtSVG);


// document.addEventListener("mouseover", (e) => {
//     if (e.target.closest(".attn > *")) {
//         Array.from(e.target.parentElement.children).some((el) => {
//             if (e.target == el) {

//                 let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//                 svg.setAttribute('class', 'attn-message');
//                 svg.setAttribute('viewBox', '0 0 232 152');
//                 svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                
//                 let image = document.createElementNS('http://www.w3.org/2000/svg', "image");
//                 image.setAttribute('href', el.getAttribute('data-img-href'));
                
//                 let text = document.createElementNS('http://www.w3.org/2000/svg', "text");
//                 text.setAttribute('x', '20');
//                 text.setAttribute('y', '18');
//                 text.textContent = 'OVERVIEW';

//                 let pathTitle = document.createElementNS('http://www.w3.org/2000/svg', "path");
//                 pathTitle.setAttribute('id', 'pathTitle');
//                 let pathCont = document.createElementNS('http://www.w3.org/2000/svg', "path");
//                 pathCont.setAttribute('id', 'pathCont');

//                 let useTitle = document.createElementNS('http://www.w3.org/2000/svg', "use");
//                 useTitle.setAttribute('href', '#pathTitle');
//                 let useCont = document.createElementNS('http://www.w3.org/2000/svg', "use");
//                 useCont.setAttribute('href', '#pathCont');

//                 svg.appendChild(pathTitle);
//                 svg.appendChild(pathCont);
//                 svg.appendChild(image);
//                 svg.appendChild(useTitle);
//                 svg.appendChild(useCont);
//                 svg.appendChild(text);

//                 document.body.append(svg);

//                 function onMouseMove(e) {
//                     svg.style.top = e.y + 10 + "px";
//                     svg.style.left = e.x + 10 + "px";
//                 };
//                 function onMouseOut() {
//                     svg.remove()
//                     el.removeEventListener("mousemove", onMouseMove);
//                     el.removeEventListener("mouseout", onMouseOut);
//                 };

//                 el.addEventListener("mousemove", onMouseMove);
//                 el.addEventListener("mouseout", onMouseOut);
//             }
//         });
//     }
// });

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
        const matchedSkill = new Map([
            [/\b\s{2}\S+/g, `  ${entry.contentRect.height - 14}`],
            [/\b\s{3}\S+/g, `   ${entry.contentRect.height - 46}`],
        ]);
        let currentWidth = entry.target.parentElement.offsetWidth,
        currentHeight = entry.target.parentElement.offsetHeight;
        if (entry.contentBoxSize) {
            if (entry.target.classList.contains('section-about__slider-wrapper-frame-border')) {
                entry.target.attributes[1].nodeValue = `0 0 ${Math.round(currentWidth)} ${Math.round(currentHeight)}`;
                entry.target.children[1].attributes[0].nodeValue = Math.round(currentWidth);
                entry.target.children[1].attributes[1].nodeValue = Math.round(currentHeight);

                entry.target.children[0].attributes[0].nodeValue = Math.round((currentWidth - entry.target.children[0].getBBox().width) / 2);
                entry.target.children[0].attributes[1].nodeValue = Math.round((currentHeight - entry.target.children[0].getBBox().height) / 2);
            } else if (entry.target.classList.contains('section-about__slider-border')) {
                let target = entry.target;
                entry.target.attributes[1].nodeValue = `0 0 ${Math.round(target.clientWidth)} ${Math.round(target.clientHeight)}`;

                // entry.target.children[0].attributes[1].nodeValue = entry.target.children[0].attributes[1].nodeValue.replace(/\B\M\S+/, `M${Math.round(target.clientWidth / 5.2)}`);
                // entry.target.children[0].attributes[1].nodeValue = entry.target.children[0].attributes[1].nodeValue.replace(/\B\L\S+/, `L${Math.round(target.clientWidth - (target.clientWidth / 5.2) - 29)}`);
                entry.target.children[0].attributes[1].nodeValue = entry.target.children[0].attributes[1].nodeValue.replace(/\b\s{2}\S+/, `  ${Math.round(target.clientWidth - 73)}`);
                entry.target.children[1].attributes[1].nodeValue = entry.target.children[1].attributes[1].nodeValue.replace(/\b\s{2}\S+/, `  ${Math.round(target.clientWidth - 73)}`);

                entry.target.children[1].attributes[1].nodeValue = entry.target.children[1].attributes[1].nodeValue.replace(/\s\d+/, ` ${Math.round(target.clientHeight - 29)}`);
            }
        }
    }
});

// observerSliderSVG.observe(sliderBrd);

for (svg of sliderAbout.querySelectorAll('svg')) observerSliderSVG.observe(svg);

// const observerSlider = new IntersectionObserver( (entries) => {
//     entries.forEach((entry) => {
//         if (entry.target.classList.contains('section-about__slider-wrapper-frame')) {
//             if (entry.intersectionRatio == 1) {
//                 entry.target.classList.add('current');
//                 sliderAbout.scrollHeight;
//             } else if (entry.intersectionRatio <= 0.5) {
//                 entry.target.classList.remove('current');
//                 sliderAbout.scrollHeight;
//             } else if (entry.intersectionRatio >= 0.5) {
//                 entry.target.classList.add('current');
//                 sliderAbout.scrollHeight;
//             };


//             if (entry.isIntersecting) {
//                 // for (ttl of sliderBrdTtl.children) {
//                 //     if (entry.target.children[0].dataset.name == ttl.textContent) {
//                 //         ttl.scrollIntoView({ block: 'nearest', inline: 'nearest' });
//                 //     }
//                 // };


//                 // if (entry.target == sliderAbout.lastElementChild) {
//                 //     console.log('last');
//                 //     sliderAbout.appendChild(sliderAbout.removeChild(sliderAbout.firstElementChild));
//                 // } else if (entry.target.previousElementSibling == sliderAbout.firstElementChild) {
//                 //     console.log('first');
//                 // };


//             };


//             // if (entry.target == sliderAbout.lastElementChild) {
//             //     console.log('last');
//             //     // sliderAbout.replaceChild(sp1, sp2);
//             //     sliderAbout.appendChild(sliderAbout.removeChild(sliderAbout.firstElementChild));
//             //     // sliderAbout.style.scrollBehavior = "auto";
//             //     // sliderAbout.firstElementChild.scrollIntoView({behavior: "auto", block: 'nearest', inline: 'nearest' });
//             //     // sliderAbout.style.scrollBehavior = "";
//             // } else if (entry.target.previousElementSibling == sliderAbout.firstElementChild) {
//             //     console.log('first');
//             //     // sliderAbout.style.scrollBehavior = "auto";
//             //     // sliderAbout.lastElementChild.scrollIntoView({behavior: "auto", block: 'nearest', inline: 'nearest' });
//             //     // sliderAbout.style.scrollBehavior = "";
//             // };


//         } else if (entry.target.classList.contains('section-about__slider-wrapper')) {
//             if (entry.intersectionRatio == 1) {
//                 // sliderBrd.classList.add('nonslct');
//                 // sliderBrd.classList.remove('nonslct');
//             }
//         }
//     })
//     }, {
//         root: sliderAbout,
//         threshold: 0.5,
//     }
// );








// var lastPos = document.body.scrollTop || document.documentElement.scrollTop,
//     perspective = 300,
//     zSpacing = -1000;
//     zVals = [],
//     $frames = $(".frame"),
//     frames = $frames.toArray(),
//     scrollMsg = document.getElementById("instructions-overlay");
//     numFrames = $frames.length;

// for(var i=0; i<numFrames;i++) { zVals.push((numFrames-i)*zSpacing);}

// $(window).scroll(function(d,e) {
//   var top = document.body.scrollTop || document.documentElement.scrollTop,
//       delta = lastPos - top;
//   lastPos = top;
//   for(var i=0;i<numFrames;i++){
//     var newZVal = (zVals[i]+=(delta*-1.5)),
//         frame = frames[i],
//         transform = "translateZ("+newZVal+"px)",
//         opacity = newZVal < 200 ? 1 : 1 - parseInt((newZVal-200)/(perspective-200)*10)/10,
//         display = newZVal > perspective ? "none" : "block";
//     frame.setAttribute("style",
    //   "-webkit-transform:"+transform+";-moz-transform:"+transform+";display:"+display+";opacity:"+opacity);
//     if(scrollMsg && zVals[numFrames-1] > 200) {
//       scrollMsg.parentNode.removeChild(scrollMsg);
//       scrollMsg = null;
//     }
//   }
// });

//-----------------------------------------------------------------------------------------------------------------------------------

let viewSection = document.querySelector('.section-about__slider');
let viewSectionWrapp = document.querySelector('.section-about__slider-wrapper');
let viewSectionFrame = document.querySelectorAll('.section-about__slider-wrapper-frame');


// let lastPos = Math.round(viewSection.scrollHeight - (viewSection.scrollTop + viewSection.clientHeight)),
// let lastPos = viewSection.scrollTop - viewSection.scrollHeight,


// let lastPos = Math.round(viewSection.scrollTop),
// zSpacing = 200,
// perspective = 600,
// zVals = [],
// snapVals = [];

// for(let i = 0; i < viewSectionFrame.length; i++) {
//     // zVals.push( ( viewSectionFrame.length - i ) * zSpacing );
//     zVals.push( i * zSpacing );

//     // snapVals.push( ( i + 1 ) * ( viewSection.clientHeight / 2 ) );
//     // snapVals.push( i == 0 ? viewSection.clientHeight / 2 : snapVals[i - 1] + viewSection.clientHeight );
//     // snapVals.push( ( i + 1 ) * ( viewSection.scrollHeight / 9 ) );
//     // snapVals.push( i == 0 ? viewSection.scrollHeight / 9 : (i + 1) * (viewSection.scrollHeight / 9) );
//     snapVals.push( i * ( ( viewSection.scrollHeight - viewSection.clientHeight ) / 8) );
// };

// function zAxisScroll(event) {
//     // let top = Math.round(viewSection.scrollHeight - (viewSection.scrollTop + viewSection.clientHeight)),
//     // let top = viewSection.scrollTop - viewSection.scrollHeight,
//     var top = Math.round(viewSection.scrollTop),
//     delta = lastPos - top;
//     lastPos = top;
//     // if (viewSection.scrollTop <= 130) return;
//     for (let i = 0; i < viewSectionFrame.length; i++) {
//         let newZVal = zVals[i] += delta * 1.5;
//         viewSectionFrame[i].style.setProperty("--translateZ", newZVal);

//         viewSectionFrame[i].children[0].style = newZVal > 8 ? `translate: 100% -50%` : '';

//         let blur = newZVal < -190 ? 1 - parseInt( newZVal / perspective * 50 ) / 100 : 0;
//         viewSectionFrame[i].style.filter = `blur(${blur}px)`;

//         let opacity = newZVal < 7 ? 2 - -parseInt( newZVal / perspective * 50 ) / 50 : 1 - parseInt( newZVal / perspective * 50 ) / 10;
//         viewSectionFrame[i].style.opacity = +opacity;
//         // viewSectionFrame[i].style = `opacity: ${+opacity}; filter: blur(${blur}px)`;
//     };

//     if (event.eventPhase != 2) {
//         zAxisScrollEnd([top])
//     };
// };


let lastPos = Math.round(viewSectionWrapp.clientHeight),
zSpacing = 200,
perspective = 600,
zVals = [],
snapVals = [];

for(let i = 0; i < viewSectionFrame.length; i++) {
    zVals.push( i * zSpacing );
    snapVals.push( i * (viewSectionWrapp.clientHeight / 8) );
};

function zAxisScroll(event) {

    // let top = lastPos - -event.deltaY,
    let top = event ? lastPos - -event.deltaY : zSpacing * 8.25,
    delta = lastPos - top;
    lastPos = top;

    for (let i = 0; i < viewSectionFrame.length; i++) {

        let newZVal = zVals[i] += delta * 1.5;

        viewSectionFrame[i].style.setProperty("--translateZ", newZVal);

        viewSectionFrame[i].children[0].style = newZVal > 8 ? `translate: 100% -50%` : '';

        let blur = -parseInt( newZVal / perspective * 200 ) / 50;
        viewSectionFrame[i].style.filter = `blur(${blur}px)`;

        let opacity = newZVal < 7 ? 2 - -parseInt( newZVal / perspective * 30 ) / 50 : 1 - parseInt( newZVal / perspective * 50 ) / 10;
        viewSectionFrame[i].style.opacity = +opacity;
    };

    // if (event.eventPhase != 2) {
    //     zAxisScrollEnd([top])
    // };
};

zAxisScroll();


let zAxisScrollEndTimer = null;

function zAxisScrollEnd(param) {
    if (zAxisScrollEndTimer !== null) {
        clearTimeout(zAxisScrollEndTimer);
    };

    zAxisScrollEndTimer = setTimeout(function() {

        for (let i = 0; i < viewSectionFrame.length; i++) {

            if (param[0] <= snapVals[i] + snapVals[1] * .5 && param[0] >= snapVals[i] - snapVals[1] * .5) {
                viewSection.scrollTop = snapVals[i];
            }

        }

    }, 150);
};

document.addEventListener('DOMContentLoaded', () => {
    viewSection.scrollTo(0, viewSection.scrollHeight);
});

// viewSection.onscroll = () => {
//     viewSectionWrapp.style.setProperty("--cameraZ", viewSection.scrollTop);
//     // document.documentElement.style.setProperty("--cameraZ", window.pageYOffset);
// };

// viewSection.addEventListener('scroll', zAxisScroll);
viewSectionWrapp.addEventListener('wheel', zAxisScroll);














// var doc = window.document,
//   context = sliderAbout,
//   clones = context.querySelectorAll('.is-clone'),
//   disableScroll = false,
//   scrollHeight = 0,
//   scrollPos = 0,
//   clonesHeight = 0,
//   i = 0;

// function getScrollPos () {
//   return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
// }

// function setScrollPos (pos) {
//   context.scrollTop = pos;
// }

// function getClonesHeight () {
//   clonesHeight = 0;

//   for (i = 0; i < clones.length; i += 1) {
//     clonesHeight = clonesHeight + clones[i].offsetHeight;
//   }

//   return clonesHeight;
// }

// function reCalc () {
//   scrollPos = getScrollPos();
//   scrollHeight = context.scrollHeight;
//   clonesHeight = getClonesHeight();

//   if (scrollPos <= 0) {
//     setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
//   }
// }

// function scrollUpdate () {
//   if (!disableScroll) {
//     scrollPos = getScrollPos();

//     if (clonesHeight + scrollPos >= scrollHeight) {
//       // Scroll to the top when you’ve reached the bottom
//       setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
//       disableScroll = true;
//     } else if (scrollPos <= 0) {
//       // Scroll to the bottom when you reach the top
//       setScrollPos(scrollHeight - clonesHeight);
//       disableScroll = true;
//     }
//   }

//   if (disableScroll) {
//     // Disable scroll-jumping for a short time to avoid flickering
//     window.setTimeout(function () {
//       disableScroll = false;
//     }, 40);
//   }
// }

// function init () {
//   reCalc();
  
//   context.addEventListener('scroll', function () {
//     window.requestAnimationFrame(scrollUpdate);
//   }, false);

//   window.addEventListener('resize', function () {
//     window.requestAnimationFrame(reCalc);
//   }, false);
// }

// if (document.readyState !== 'loading') {
//   init()
// } else {
//   doc.addEventListener('DOMContentLoaded', init, false)
// };











// sliderAbout.onscroll = () => {
//     sliderBrd.classList.add('nonslct');
// };
// sliderAbout.onscrollend = () => {
//     sliderBrd.classList.remove('nonslct');
// };

// observerSlider.observe(sliderAbout);
// for (frame of sliderAbout.children) observerSlider.observe(frame);



// sliderAbout.addEventListener("scrollsnapchange", (event) => {
//     const currentlySnapped = document.querySelector(".current");
//     if (currentlySnapped) {
//         currentlySnapped.classList.remove('current');
//         // currentlySnapped.classList.remove("select-section");
//     }
    
//     event.snapTargetBlock.classList.add('current');
//     // event.snapTargetBlock.classList.add("select-section");
// });





// function resBttn_hover(e) {
//     let resBord_grad = document.querySelectorAll('#section-about__article-resume-border_grad stop');
//     let resBord_g = document.querySelectorAll('.section-about__article-resume-border g');
//     let pointY = [[' 19', ' 42'], [' 13', ' 46']];
//     let j = 0;

//     if (e.target.closest('a').getAttribute('data-position') == 'left') {
//         resBord_grad[1].attributes[1].nodeValue = resBord_grad[0].attributes[1].nodeValue
//         resBord_grad[0].attributes[1].nodeValue = 'white';
//         for (let i=0; i<2; i++) {
//             resBord_g[0].attributes[0].nodeValue = 1;
//             resBord_g[0].children[i].attributes[0].nodeValue = resBord_g[0].children[i].attributes[0].nodeValue.replace(/\s(.*?)\d\d{0,}/, pointY[0][i]);
//         }
//         j = 0;
//     } else if (e.target.closest('a').getAttribute('data-position') == 'right') {
//         resBord_grad[0].attributes[1].nodeValue = resBord_grad[1].attributes[1].nodeValue
//         resBord_grad[1].attributes[1].nodeValue = 'white';
//         for (let i=0; i<2; i++) {
//             resBord_g[1].attributes[0].nodeValue = 1;
//             resBord_g[1].children[i].attributes[0].nodeValue = resBord_g[1].children[i].attributes[0].nodeValue.replace(/\s(.*?)\d\d{0,}/, pointY[0][i]);
//         }
//         j = 1;
//     }

//     e.target.closest('a').addEventListener('mouseout', () => {
//         resBord_grad[0].attributes[1].nodeValue = resBord_grad[1].attributes[1].nodeValue = '#d1ffff80';
//         for (let i=0; i<2; i++) {
//             resBord_g[i].attributes[0].nodeValue = 0
//             resBord_g[j].children[i].attributes[0].nodeValue = resBord_g[j].children[i].attributes[0].nodeValue.replace(/\s(.*?)\d\d{0,}/, pointY[1][i]);
//         };
//     });
// };

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
    // for (st of statesPenta) statesPenta[i] == st ? st.classList.toggle('skill__select') : st.classList.remove('skill__select');
    // for (st of detailSoft.children) {
        //     if (e.target.closest(".state") == st) {
    //         st.classList.toggle('skill-desc__select');
    //     } else {
    //         st.open = false;
    //         st.classList.remove('skill-desc__select');
    //     }
    // }
    // for (st of statesPenta) statesPenta[i] == st ? st.classList.toggle('skill__select') : st.classList.remove('skill__select');
    // }
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
                return statesDescrTerm[i].style = statesPenta[i].style = "color: var(--color-fern-crayola);";
            } else {
                i++;
            }
        });
        e.target.addEventListener(event, () => {
            parametr.attributes[1].nodeValue = "M37.5 59 28.515 44.53 10.998 40.713 21.735 27.058 21.991 11.541 37.5 18 51.672 13.264 52.535 27.276 61.957 40.039 45.688 43.318ZM51.672 13.264 37.5 32M21.991 11.541 37.5 32M10.998 40.713 37.5 32M37.5 59 37.5 32M61.957 40.039 37.5 32M37.5 18 37.5 32M21.735 27.058 37.5 32M28.515 44.53 37.5 32M45.688 43.318 37.5 32M52.535 27.276 37.5 32";
            statesDescrTerm[i].style = statesPenta[i].style = "";
        });
    };
};


let SVGdescSkill = document.querySelector(".description-wrapper__skill-border");
let skillSection = document.querySelector(".description-wrapper__skill-details");

const observerSkillSection = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const matchedSkill = new Map([
            [/\b\s{2}\S+/g, `  ${entry.contentRect.height + 10}`],
            [/\b\s{3}\S+/g, `   ${entry.contentRect.height - 22}`],
        ]);
        if (entry.contentBoxSize) {
            // SVGdescSkill.attributes[1].nodeValue = `0 -${Math.round(entry.target.offsetTop - 14)} ${Math.round(entry.target.parentElement.offsetWidth)} 144`;
            SVGdescSkill.attributes[1].nodeValue = `0 ${-Math.round(entry.target.offsetTop - 14)} ${Math.round(entry.target.parentElement.offsetWidth)} 144`;
            SVGdescSkill.children[0].attributes[0].nodeValue = entry.contentRect.height + 100;
            SVGdescSkill.children[0].attributes[1].nodeValue = entry.target.parentElement.offsetWidth;
            SVGdescSkill.children[1].attributes[2].nodeValue = SVGdescSkill.children[1].attributes[2].nodeValue.replace(/\s\M\S+/, ` M${entry.target.parentElement.offsetWidth - 30}`);
            for (const [key, value] of matchedSkill.entries()) {
                SVGdescSkill.children[1].attributes[2].nodeValue = SVGdescSkill.children[1].attributes[2].nodeValue.replace(key, value);
            };
        }
    }
});

observerSkillSection.observe(skillSection);

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

// const resizeObserver = new ResizeObserver((entries) => {
//     let i = 0;
//     for (const entry of entries) {
//         if (entry.contentBoxSize) {
//             SVGContSkill[i].attributes[1].nodeValue = `0 0 ${Math.round(entry.target.offsetWidth)} ${Math.round(entry.target.offsetHeight)}`;
//             i++;
//         }
//     }
// });

// resizeObserver.observe(skillSectionCont);



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

let descrWrapSoft = document.querySelector(".description-wrapper__software-article");
let descrTitleSoft = document.querySelector(".description-wrapper__software-article-title");
let descrTxtSoft = document.querySelector(".description-wrapper__software-article-description");

let SVGdescSoft = document.querySelector(".description-wrapper__software-border");

// let SVGdescSoftTop = document.querySelector(".description-wrapper__software-border #description-wrapper__software-border-1");
// let SVGdescSoftMidle = document.querySelector(".description-wrapper__software-border #description-wrapper__software-border-3");
// let SVGdescSoftBottom = document.querySelector(".description-wrapper__software-border #description-wrapper__software-border-2");

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














// softwareIcon.addEventListener('click', async (e) => {
//     let targButton = e.target.closest(".icon-button");
//     if (!targButton) return;

//     for (btn of targButton.offsetParent.children) {
//         if (targButton != btn) {
//             btn.children[0].children[1].attributes[1].nodeValue = 'M1 1l4 0 1 2 1-2 6 0 2 0 6 0 2 0 6 0 2 2 0 27-28 0-2-2z';
//             btn.children[0].children[2].attributes[1].nodeValue = 'M13.5.5l2 0 5 0 2 0z';
//             btn.children[0].children[2].style = '';
//         }
//     }
//     targButton.children[0].children[1].attributes[1].nodeValue = 'M1 1l4 0 1 2 1-2 6 0 2 2 6 0 2-2 6 0 2 2 0 27-28 0-2-2z';
//     targButton.children[0].children[2].attributes[1].nodeValue = 'M13.5.5l2 2 5 0 2-2z';
//     targButton.children[0].children[2].style = 'opacity: 1;';


//     abilDesc.children[1].classList.add("software__hidden");
//     await sleep(200);

//     SVGdescSoft.children[1].attributes[2].nodeValue = SVGdescSoft.children[1].attributes[2].nodeValue.replace(/\s(.*?)\d\d{0,}/, ` 48`);
//     SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\s{4}.*?\s/, `    7 `);

//     await sleep(300);

//     SVGdescSoft.children[0].attributes[2].nodeValue = SVGdescSoft.children[0].attributes[2].nodeValue.replace(/\d.*?\s/, `160 `);
//     SVGdescSoft.children[0].attributes[2].nodeValue = SVGdescSoft.children[0].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  6 `);
//     SVGdescSoft.children[0].attributes[2].nodeValue = SVGdescSoft.children[0].attributes[2].nodeValue.replace(/\s{3}.*?\s/, `   -8 `);
//     SVGdescSoft.children[1].attributes[2].nodeValue = SVGdescSoft.children[1].attributes[2].nodeValue.replace(/\d.*?\s/, `160 `);
//     SVGdescSoft.children[1].attributes[2].nodeValue = SVGdescSoft.children[1].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  6 `);
//     SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\d.*?\s/, `155 `);
//     SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  8 `);
//     SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\s{3}.*?\s/, `   4 `);
//     SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\s{5}.*?\s/, `     -18 `);

//     await sleep(300);

//     SVGdescSoft.children[0].attributes[2].nodeValue = SVGdescSoft.children[0].attributes[2].nodeValue.replace(/\d.*?\s/, `8 `);
//     SVGdescSoft.children[0].attributes[2].nodeValue = SVGdescSoft.children[0].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  310 `);
//     SVGdescSoft.children[0].attributes[2].nodeValue = SVGdescSoft.children[0].attributes[2].nodeValue.replace(/\s{3}.*?\s/, `   -107 `);
//     SVGdescSoft.children[1].attributes[2].nodeValue = SVGdescSoft.children[1].attributes[2].nodeValue.replace(/\d.*?\s/, `8 `);
//     SVGdescSoft.children[1].attributes[2].nodeValue = SVGdescSoft.children[1].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  310 `);
//     SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\d.*?\s/, `3 `);
//     SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\s{2}.*?\s/, `  213 `);
//     SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\s{3}.*?\s/, `   103 `);
//     SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\s{5}.*?\s/, `     -322 `);

//     await sleep(300);

//     descrTitleSoft.children[0].children[2].innerHTML = '';
//     descrTitleSoft.children[0].children[1].attributes[1].nodeValue = targButton.children[1].children[0].attributes[1].nodeValue;
//     descrTitleSoft.children[1].innerHTML = targButton.value;
//     descrTxtSoft.innerHTML = `<p>${colTitle_Desc[targButton.value]}</p>`;

//     let descSize = descrTitleSoft.offsetHeight + descrTxtSoft.offsetHeight;
//     let descrTxtSoftSize = descrTxtSoft.getBoundingClientRect();


//     // SVGdescSoft.children[1].attributes[2].nodeValue = SVGdescSoft.children[1].attributes[2].nodeValue.replace(/\s(.*?)\d\d{0,}/, (match) => ` ${Math.round(+match + (descSize - 44))}`);
//     SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\s{4}.*?\s/, `    ${Math.round(descrTxtSoft.getBoundingClientRect().height)} `);

//     // SVGdescSoft.children[1].attributes[2].nodeValue = SVGdescSoft.children[1].attributes[2].nodeValue.replace(/\s(.*?)\d\d{0,}/, (match) => ` ${Math.floor(+match + (descSize - 44))}`);
//     // SVGdescSoft.children[2].attributes[2].nodeValue = SVGdescSoft.children[2].attributes[2].nodeValue.replace(/\s{4}.*?\s/, (match) => `    ${Math.floor(+match + (descSize - 44))} `);

//     await sleep(200);
//     abilDesc.children[1].classList.remove("software__hidden");
// });












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
