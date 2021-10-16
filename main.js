"use strict"

document.addEventListener('click', (event) => {
  let clck = event.target;

  if(clck.className == 'new-zametka') {
    document.body.querySelector('.vvod').style.display = 'flex';
  }

  if(clck.className == 'delete') {
    clck.parentNode.remove();
    event.preventDefault();
  }

  if(clck.className == 'zam' || clck.className == 'zam close-zam') {
    if(event.defaultPrevented) return;
    clck.classList.toggle('close-zam');
    clck.querySelector('.delete').classList.toggle('close');
  }

  if(clck.className == 'zagg') {
    clck.parentNode.classList.toggle('close-zam');
    clck.parentNode.querySelector('.delete').classList.toggle('close');
  }

  if(clck.className == 'p-text') {
    clck.parentNode.classList.toggle('close-zam');
    clck.parentNode.querySelector('.delete').classList.toggle('close');
  }
});

document.body.querySelector('.vvod').onclick = function(event) {
  let elem = event.target;
  let date = new Date();

  if(elem.className == 'otmen') {
    document.body.querySelector('.vvod').style.display = 'none';
  }

  if(elem.className == 'vvod-data') {
    document.body.querySelector('.vvod').style.display = 'none';
    let zam = document.body.querySelector('.vashi-zametki');
    let div = document.createElement('div');
    div.classList.add('zam');
    let button = document.createElement('img');
    let zag = document.createElement('h3');
    let p = document.createElement('p');
    let t = document.createElement('span');
    t.classList.add('time');
    p.classList.add('p-text');
    zag.classList.add('zagg');
    button.classList.add('delete');
    button.classList.add('close');
    button.src = 'delete.svg';
    zag.textContent = document.body.querySelector('.name').value;
    p.textContent = document.body.querySelector('.main-text').value;
    t.textContent = `Время ${date.getHours()}:${date.getMinutes()} Дата ${date.getFullYear()}.${date.getMonth()+1}`;
    div.prepend(t);
    div.prepend(button);
    div.prepend(p);
    div.prepend(zag);
    zam.prepend(div);
    document.body.querySelector('.main-text').value = '';
    document.body.querySelector('.name').value = '';
  }
}