let main = document.querySelector('.main');
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
    } else if (childPos != pos && childPos < pos) {
        main.style.transform = 'translateZ(-20rem)';
        await sleep(500);
        main.style.translate = '';
        await sleep(700);
        main.style.transform = '';
        pos -= 1;
    }
});
