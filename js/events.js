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
//Анимация появления текста(печать)
async function textTyping(doc, txt, speed) {
    let i = 0;
    let logoRandom = '';
    function typeWriter() {
        if (i < txt.length && state) {
            logoRandom += txt.charAt(i);
            doc.innerHTML = logoRandom;
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter()
};
//Функция задержки
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
//Прокрутка к основному фрейму
window.onload = function() {
    document.all[0].style.scrollBehavior = "auto";
    home.scrollIntoView({behavior: "auto"});
    document.all[0].style.scrollBehavior = "";
}

//Скролл по id
document.addEventListener('click', async function (e) {
    if (e.target.id != "btn") return;
    let containerChoosed = document.getElementById(e.target.closest('#btn').hash.replace(/#/g, ''));
    containerChoosed.scrollIntoView({ behavior: 'smooth' });
});

//Выбор скилла
let parametr = document.querySelector(".parametr");
let states = document.querySelectorAll(".state");

document.addEventListener('mouseover', function(e) {
    if (e.target.className.baseVal != "state") return;

    if (e.target == states[0]) {
        // parametr.style.clipPath = "polygon(49.8% 75.51%, 64% 65%, 91.2% 59%, 73.8% 38%, 67.68% 20.58%, 49.9% 17.12%, 22.2% 4.5%, 20% 36.2%, 10.73% 58.3%, 35.59% 66.24%)"
        parametr.style.clipPath = parametr.style.clipPath.replace(/49.8% 21.25%, 29.2% 16.45%, 24.69% 37.8%/g, '49.9% 17.12%, 22.2% 4.5%, 20% 36.2%');
        // parametr.style.clipPath.replace(/49.8% 21.25%, 29.2% 16.45%, 24.69% 37.8%/g, '49.9% 17.12%, 22.2% 4.5%, 20% 36.2%')
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




!function(prt){
    prt._getAbsoluteCTM = function(){
        var owner = this.ownerSVGElement || this,
            height = owner.height.baseVal.value,
            width = owner.width.baseVal.value,
            viewBoxRect = owner.viewBox.baseVal,
            vHeight = viewBoxRect.height,
            vWidth = viewBoxRect.width;
        if(!vWidth || !vHeight){
            return this.getCTM();
        }
        var sH = height/vHeight,
            sW = width/vWidth,
            matrix = owner.createSVGMatrix();
        matrix.a = sW;
        matrix.d = sH
        var realCTM = this.getCTM().multiply(matrix.inverse());
        realCTM.e = realCTM.e/sW + viewBoxRect.x;
        realCTM.f = realCTM.f/sH + viewBoxRect.y;
        return realCTM;
    }
}(SVGGraphicsElement.prototype);




let test = document.querySelector("#TEST");
let one = document.querySelector("#ONE");
let two = document.querySelector("#TWO");
let line = document.querySelector("#line0");
let crc = document.querySelectorAll(".crc");
let tst = document.querySelectorAll(".tst");
let lne = document.querySelectorAll(".line");
let pnta = document.querySelector("#pnta");
let losta = document.querySelector("#losta");
const map1 = new Map();

document.addEventListener('DOMContentLoaded', async function() {
    for (let i=0;i<crc.length;i++) {
        map1.set(crc[i], tst[i]);
    };
    while(true) {
        pnta.attributes.d.value = "M";
        for (let i=0;i<map1.size;i++) {
            // let m = losta.getTransformToElement(crc[i]);
            let werty = losta.getScreenCTM().inverse().multiply( crc[i].getScreenCTM() );
            let CTM = crc[i].getScreenCTM();
            let asdfghj = crc[i].getBBox();
            let s = crc[i].getCTM();
            let {width,height} = crc[i].getBBox();
            // let {x,y} = crc[i].getBoundingClientRect();
            // x = x + width/2;
            // y = y + height/2;
            x = werty.e;
            y = werty.f;
            tst[i].setAttribute("cx", x);
            tst[i].setAttribute("cy", y);
            // pnta.attributes.d.value += `${x/2}, ${y/2} `;
        };
        for (let i=0;i<map1.size;i++) {
            pnta.attributes.d.value += `${map1.get(crc[i]).getAttribute("cx")}, ${map1.get(crc[i]).getAttribute("cy")} `;
            // let curr = i;
            // lne[i].setAttribute("x1", map1.get(crc[i]).getAttribute("cx"));
            // lne[i].setAttribute("y1", map1.get(crc[i]).getAttribute("cy"));
            // curr = ++curr % map1.size;
            // lne[i].setAttribute("x2", map1.get(crc[curr]).getAttribute("cx"));
            // lne[i].setAttribute("y2", map1.get(crc[curr]).getAttribute("cy"));
        };
        pnta.attributes.d.value += "z";
        await sleep(30);
    };
    function coordinateTransform(screenPoint, someSvgObject) {
        var CTM = someSvgObject.getScreenCTM();
        return screenPoint.matrixTransform( CTM.inverse() );
    };
    // one.cx.baseVal.value;
    // one.cy.baseVal.value;
    // one.lastElementChild;
    // let m = one.getTransformToElement(saas);
    // let asdsa = one.getAttributeNS(null, 'cx');
    // let onePos = one.getBoundingClientRect();
    // let bboxGroup = one.getBBox();
    // let a = one.getScreenCTM();
    // let s = one.getCTM();
    // let inverse = a.inverse();
    // let inverse = a.getScreenCoords();
    // var CTM = one.getScreenCTM();
    // line.x1.baseVal.value = (one.clientLeft - CTM.e) / CTM.a;
    // line.y1.baseVal.value = (one.clientTop - CTM.f) / CTM.d;
    // line.x1.baseVal.value = s.e + 170;
    // line.y1.baseVal.value = -s.f;
    // line.x1.baseVal.value = -inverse.e;
    // line.y1.baseVal.value = -s.f;
    // line.x1.baseVal.value = one.cx.baseVal.value;
    // line.y1.baseVal.value = one.cy.baseVal.value;
    // line.x2.baseVal.value;
    // line.y2.baseVal.value;
    // let das = one._getAbsoluteCTM();
});


// let flag = 0;
// // svg = document.querySelector('#ONE');
// let losta = document.querySelector('#losta');
// // $svg = $(svg);

// let pause = function() {
//     let fasd = losta.animate();
//     // fasd.progress();
//     // let rect = draw.rect(100, 100);
//     // let runner = rect.animate();
//     losta.progress();
// };


// function distance(start: Point, end: Point) {
//     const dx = to.x - from.x
//     const dy = to.y - from.y

//     return Math.sqrt(dx * dx + dy * dy)
// }

// function calculatePath(start: Point, end: Point) {
//     const center = {
//         x: (start.x + end.x) / 2,
//         y: (start.y + end.y) / 2,
//     }

//     const controlPoint = {
//         x: start.x + Math.min(
//             distance(start, end),
//             Math.abs(end.y - start.y) / 2,
//             150
//         ),
//         y: start.y,
//     }

//     return `M ${start.x},${start.y} Q ${controlPoint.x}, ${controlPoint.y} ${center.x},${center.y} T ${end.x},${end.y}`
// }








//Анимация скиллов
document.addEventListener('DOMContentLoaded', async function(e) {
    R = {
        '66% 68%':'65% 67.25%',
        '67% 70.62%':'64% 65%',
        '65% 67.25%':'66% 68%',
        '64% 65%':'67% 70.62%',
        


        // '73.8% 38%':'82% 35.6%',
        // '75.94% 37.5%':'',
        // '82% 35.6%':'73.8% 38%',
        // '':'75.94% 37.5%',


        // '':'',
        // '':'',
    };
    // for( from in R) key = key.replace( from, R[ from]);
    while(parametr) {
        // parametr.style.clipPath = parametr.style.clipPath.replace(/64% 65%/g, '67% 70.62%');
        for(from in R) parametr.style.clipPath = parametr.style.clipPath.replace( from, R[from]);
        // parametr.style.clipPath = parametr.style.clipPath.replace(/5/g, '65% 67.25%');
        await sleep(100);
        parametr.style.clipPath = parametr.style.clipPath.replace(/67% 70.62%/g, '64% 65%');
        parametr.style.clipPath = parametr.style.clipPath.replace(/73.8% 38%/g, '82% 35.6%');
        await sleep(100);
        parametr.style.clipPath = parametr.style.clipPath.replace(/82% 35.6%/g, '73.8% 38%');
        parametr.style.clipPath = parametr.style.clipPath.replace(/49.8% 21.25%/g, '49.8% 10.75%');
        await sleep(100);
        parametr.style.clipPath = parametr.style.clipPath.replace(/49.8% 10.75%/g, '49.8% 21.25%');
        parametr.style.clipPath = parametr.style.clipPath.replace(/24.69% 37.8%/g, '17.56% 35.4%');
        await sleep(100);
        parametr.style.clipPath = parametr.style.clipPath.replace(/17.56% 35.4%/g, '24.69% 37.8%');
        parametr.style.clipPath = parametr.style.clipPath.replace(/35.59% 66.24%/g, '31.4% 72.23%');
        await sleep(100);
        parametr.style.clipPath = parametr.style.clipPath.replace(/31.4% 72.23%/g, '35.59% 66.24%');
        await sleep(3000);
    }
});

//Выбор категории
let contSkills = document.querySelector(".container_skills");
let contCircle = document.querySelector(".container_software");
let arrow = document.querySelectorAll(".container_abilities > .arrow");

document.addEventListener('mouseover', function(e) {
    if (!e.target.closest('.container')) return;

    if (e.target.closest('.left')) {
        contCircle.style = "display: block; z-index: -1; opacity: 0.5; transform: translate3d(-10%, -50%, -2rem) scale(0.5); filter: blur(2px)";
        contSkills.style = "display: block; z-index: 1; opacity: 1; transform: translate3d(-50%, -50%, 0) scale(1); filter: blur(0px)";
        arrow[0].style = "opacity: 0.6; filter: blur(2px)";
        arrow[1].style = "opacity: 1; filter: blur(0px)";
    } else if (e.target.closest('.right')) {
        contSkills.style = "display: block; z-index: -1; opacity: 0.5; transform: translate3d(-90%, -50%, -2rem) scale(0.5); filter: blur(2px);";
        contCircle.style = "display: block; z-index: 1; opacity: 1; transform: translate3d(-50%, -50%, 0); filter: blur(0px)";
        arrow[1].style = "opacity: 0.6; filter: blur(2px)";
        arrow[0].style = "opacity: 1; filter: blur(0px)";
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
    prev: -1,
};
let state = true;

document.addEventListener('mouseover', function(e) {
    if (!e.target.closest('.software')) return;
    if (e.target.closest('.software') == software[0]) {
        software[0].style.transform = "translateZ(2rem) translate(-50%,-50%)";
        software[0].style.opacity = "1";
        circle.children[3].style.filter = "blur()";
        circle.children[3].style.opacity = "1";
        icon = "#HTML-CSS";
        num.i = 3;
        num.j = 0;
        content = "Fluent in HTML, CSS. Freely use grid and flex layout. I know the BEM methodology. As well as without problems layout sites by design with Figma."
    } else if (e.target.closest('.software') == software[1]) {
        software[1].style.transform = "translateZ(2rem) translate(-50%,-50%)";
        software[1].style.opacity = "1";
        circle.children[4].style.filter = "blur()";
        circle.children[4].style.opacity = "1";
        icon = "#JS";
        num.i = 4;
        num.j = 1;
        content = "Events, object, array"
    } else if (e.target.closest('.software') == software[2]) {
        software[2].style.transform = "translateZ(2rem) translate(-50%,-50%)";
        software[2].style.opacity = "1";
        circle.children[5].style.filter = "blur()";
        circle.children[5].style.opacity = "1";
        icon = "#SASS";
        num.i = 5;
        num.j = 2;
        content = "Creation and formation of style files, their convenient and expedient arrangement."
    } else if (e.target.closest('.software') == software[3]) {
        software[3].style.transform = "translateZ(2rem) translate(-50%,-50%)";
        software[3].style.opacity = "1";
        circle.children[1].style.filter = "blur()";
        circle.children[1].style.opacity = "1";
        icon = "#GIT";
        num.i = 1;
        num.j = 3;
        content = "Working in a team, creating commits."
    } else if (e.target.closest('.software') == software[4]) {
        software[4].style.transform = "translateZ(2rem) translate(-50%,-50%)";
        software[4].style.opacity = "1";
        circle.children[2].style.filter = "blur()";
        circle.children[2].style.opacity = "1";
        icon = "#REACT";
        num.i = 2;
        num.j = 4;
        content = "I don`t fucking know."
    }
    for (use of softwareSlct.children) use.href.baseVal = icon;


    if (e.target.closest('.software') != num.prev) {
        // play(description, content, 25)
        state = state ? false : true;
        textTyping(description, content, 25);
    };

    for (soft of software) {
        if (e.target.closest('.software') == soft) num.prev = soft;
    }
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