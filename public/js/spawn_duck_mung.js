let img_container = document.getElementById('img_container');

let rotate_num = Math.floor(Math.random() * 6) + 1
console.log(rotate_num);

for(let i=1;i<8;i++){
    let duck = document.createElement('img');
    duck.src='src/agduck.png'
    duck.alt='agDuck'
    duck.classList.add('agDuck', 'agDuck'+i);

    if (i == rotate_num) {
        duck.classList.add('rotate');
    }
    img_container.appendChild(duck);
}

rotate_num = Math.floor(Math.random() * 5) + 1
console.log(rotate_num);

for(let i=1;i<7;i++){
    let mung = document.createElement('img');
    mung.src='src/agmung.png'
    mung.alt='agMung'
    mung.classList.add('agMung', 'agMung'+i);

    if (i == rotate_num) {
        mung.classList.add('rotate');
    }
    img_container.appendChild(mung);
}