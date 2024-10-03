let blockR = document.querySelector('.blockR');
let frames = blockR.children;



window.addEventListener('load', scrollFrame);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// blockR.onclick = () => {
//     breakable = false;
//     scrollFrame();
//     breakable = true;
// };

// blockR.onmouseenter = () => breakable = true;
// blockR.addEventListener('mouseenter', () => breakable = true);

// blockR.onmouseleave = async () => {
//     breakable = false;
//     await sleep(1000);
//     scrollFrame();
// };
// blockR.addEventListener('mouseleave', async () => {
//     breakable = false;
//     await sleep(1000);
//     scrollFrame();
// });







let n = 0;
let p = 1;
let breakable = false;
let state = false;
let last = false;

const generator = function* (arr, pos) {
    let length = arr.length;
    let i = pos;
    while(true) {
        yield arr[i];
        i++;
        if(i === length) i = 0;
    }
}

const frameHidd = generator(frames, 0);
const frameFront = generator(frames, 0);
const frameMid = generator(frames, 1);
const frameBack = generator(frames, 2);

async function scrollFrame() {

    while (!breakable) {

        
        frameFront.next().value.id = 'pos1';
        
        frameMid.next().value.id = 'pos2';
        
        frameBack.next().value.id = 'pos3';
        
        if (state) {
            let hidd = frameHidd.next().value;
            hidd.id = 'hidd';
            await sleep(300);
            hidd.id = '';
        }

        state = true;
        await sleep(3000);
        // await new Promise(resolve => setTimeout(resolve, 2000));
    }


    
    // while (!breakable) {

    //     frames[n] ? frames[n].id = 'pos1' : frames[p - 3].id = 'pos1';
        
    //     frames[n + 1] ? frames[n + 1].id = 'pos2' : frames[p - 2].id = 'pos2';
        
    //     frames[n + 2] ? frames[n + 2].id = 'pos3' : frames[p - 1].id = 'pos3';

    //     if (state) {
    //         frames[n - 1].id = 'hidd';
    //         await sleep(300);
    //         last ? frames[8].id = '' : frames[n - 1].id = '';
    //     }

    //     if (n < 7) {
    //         n += 1;
    //         state = true;
    //         last = false;
    //     } else if (n < 9) {
    //         n += 1;
    //         p += 1;
    //     } else {
    //         n = 1;
    //         p = 1;
    //         last = true;
    //     };

    //     await new Promise(resolve => setTimeout(resolve, 2000));
    // }
    
    


    // function move() {

    //     frames[n] ? frames[n].id = 'pos1' : frames[p - 3].id = 'pos1';
        
    //     frames[n + 1] ? frames[n + 1].id = 'pos2' : frames[p - 2].id = 'pos2';
        
    //     frames[n + 2] ? frames[n + 2].id = 'pos3' : frames[p - 1].id = 'pos3';

    //     if (state) {
    //         frames[n - 1].id = 'hidd';

    //         setTimeout(() => {
    //             last ? frames[8].id = '' : frames[n - 2].id = '';
    //         }, 300);
    //     }

    //     if (n < 7) {
    //         n += 1;
    //         state = true;
    //         last = false;
    //     } else if (n < 9) {
    //         n += 1;
    //         p += 1;
    //     } else {
    //         n = 1;
    //         p = 1;
    //         last = true;
    //     };

    //     setTimeout(() => {
    //         if (breakable) return;
    //         move();
    //     }, 2000)
    // }
}







// function scrollFrame() {

//     let n = 0;
//     let p = 1;
//     let state = false;
//     let last = false;

//     function move() {

//         if (state) {
//             frames[n - 1].id = 'hidd';

//             setTimeout(() => {
//                 last ? frames[8].id = '' : frames[n - 2].id = '';
//             }, 500);
//         }

//         frames[n] ? frames[n].id = 'pos1' : frames[p - 3].id = 'pos1';
        
//         frames[n + 1] ? frames[n + 1].id = 'pos2' : frames[p - 2].id = 'pos2';
        
//         frames[n + 2] ? frames[n + 2].id = 'pos3' : frames[p - 1].id = 'pos3';

//         if (n < 7) {
//             n += 1;
//             state = true;
//             last = false;
//         } else if (n < 9) {
//             n += 1;
//             p += 1;
//         } else {
//             n = 1;
//             p = 1;
//             last = true;
//         };
        
//         setTimeout(() => {
//             move();
//         }, 2000)
//     }

//     setTimeout(() => {
//         move();
//     }, 200)
// }