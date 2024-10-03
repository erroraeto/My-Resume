let content = document.querySelector('.content');
let skills = document.querySelector('.skills');
let about = document.querySelector('.about');
let frame = 'about';

document.addEventListener('click', function (e) {
    if (!e.target.closest('.button')) return;
    
    let winSize = window.innerWidth;

        if (e.target.closest('#aboutMe') && frame != 'about') {
            skills.style.scale = '0.8';
            about.style.scale = '0.8';
            setTimeout(() => {
                content.style.translate = '';
                frame = 'about';
            }, 300);
        } else if (e.target.closest('#skill') && frame != 'skills') {
            skills.style.scale = '0.8';
            about.style.scale = '0.8';
            setTimeout(() => {
                content.style.translate = -winSize + 'px';
                frame = 'skills';
            }, 300);
        };

    setTimeout(() => {
        skills.style.scale = '';
        about.style.scale = '';
    }, 800)
});