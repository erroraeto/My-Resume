let content = document.querySelector('.content');
let pos = 0;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('click', async function (e) {
    if (!e.target.closest('.btn')) return;
    const node = e.target.parentNode;
    let childPos = [...node.children].indexOf(e.target);

    if (childPos != pos && childPos > pos) {
        Array.from(content.children).forEach((elem) => elem.style.scale = '0.8');
        await sleep(500);
        content.style.translate = -100 + 'vw';
        await sleep(700);
        Array.from(content.children).forEach((elem) => elem.style.scale = '');
        pos += 1;
    } else if (childPos != pos && childPos < pos) {
        Array.from(content.children).forEach((elem) => elem.style.scale = '0.8');
        await sleep(500);
        content.style.translate = '';
        await sleep(700);
        Array.from(content.children).forEach((elem) => elem.style.scale = '');
        pos -= 1;
    }
});
