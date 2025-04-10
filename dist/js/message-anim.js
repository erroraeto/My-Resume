let status = false;
document.addEventListener('mousemove', function(event) {
    if (!status) return;
    let author = document.querySelector('.author');
  
    let i = author.getBoundingClientRect(),
      x = Math.round(i.left + (i.width / 2)),
      y = Math.round(i.top + (i.height / 2));
  
    x = (x - event.screenX);
    y = (y - event.screenY);

    author.style.transform = 'rotatex(' + y/30 + 'deg)';   
    author.style.transform += 'rotateY(' + -x/30 + 'deg)';
    
    if ( y < 0 && x > 0 || y > 0 && x < 0 ) {
        author.style.transform += 'rotateZ(' + -Math.abs(x-y)/10000 + 'deg)';
    } else if ( y > 0 && x > 0 || y < 0 && x < 0 ) {
        author.style.transform += 'rotateZ(' + Math.abs(x-y)/10000 + 'deg)';
    }
});

let indexIcon = document.getElementById('index-icon');
let author = document.querySelector('.author');
let message = document.querySelector('.message');

indexIcon.addEventListener('click', function() {
    let photo = document.querySelector('.photo');
    message.style.display = '';
    
    if (status) {
        photo.classList.remove('active');
        let ul = document.querySelectorAll('.info li');
        for (li of ul) {
            li.classList.add('hidden');
        };
        setTimeout(() => {
            document.querySelector('.info').remove();
            message.style.display = 'none';
        }, 200);
        return status = false;
    };

    setTimeout(() => {
        photo.classList.add('active');
    }, 50);
    status = true;

    author.insertAdjacentHTML('beforeend',
        `<div class="info">
            <ul class="txt">
                <li data-text="!FRONTEND DEVELOPER"></li>
                <li data-text="NATIONALITY : RUSSIAN"></li>
                <li data-text="NAME : DANILA"></li>
                <li data-text="AGE : 22 Y.O."></li>
                <li data-text="SEX : MALE"></li>
            </ul>
        </div>`
    );
    play();
});


function play() {
    let txt = document.querySelectorAll('.txt li');

    txt.forEach( li => {
        let logoTitle = li.dataset.text;
        let logoRandom = '';
        let possible = "-+*/|}{[]~\\\":;?/.><=+-_)(*&^%$#@!)}";
        let printLength = 1;

        function generateRandomTitle(i, logoRandom) {
            setTimeout( function() {
            li.textContent = logoRandom;
            }, i*70 );
        }
        for( let i=0; i < logoTitle.length+1; i++ ) {
            logoRandom = logoTitle.substr(0, i);
            if (printLength < logoTitle.length) printLength += 1;
            for( let j=i; j < printLength; j++ ) { 
                logoRandom += possible.charAt(Math.floor(Math.random() * possible.length)); 
            }
            generateRandomTitle(i, logoRandom);
            logoRandom = '';
        }
    })
}