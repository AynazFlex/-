"use strict"

document.addEventListener('click', (event) => {
  let clck = event.target;

  if(clck.className == 'new-zametka') {
    document.body.querySelector('.vvod').style.display = 'flex';
  }

  if(clck.className == 'delete') {
    clck.closest('.zam').remove();
  }

  if(clck.closest('.zam')) {
    clck.closest('.zam').classList.toggle('close-zam');
    clck.closest('.zam').querySelector('.delete').classList.toggle('close');
    clck.closest('.zam').querySelector('.edit').classList.toggle('close');
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
    let edit = document.createElement('img');
    let zag = document.createElement('h3');
    let p = document.createElement('p');
    let t = document.createElement('span');
    t.classList.add('time');
    p.classList.add('p-text');
    zag.classList.add('zagg');
    button.classList.add('delete');
    button.classList.add('close');
    edit.classList.add('edit');
    edit.classList.add('close');
    edit.src = 'edit.svg';
    button.src = 'delete.svg';
    if(document.body.querySelector('.name').value == '') {
      zag.textContent = 'Без название';
    } else {
      zag.textContent = document.body.querySelector('.name').value;
    }
    p.innerHTML = document.body.querySelector('.main-text').value;
    t.textContent = `Время ${date.getHours()}:${date.getMinutes()} Дата ${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
    div.prepend(t);
    div.prepend(button);
    div.prepend(edit);
    div.prepend(p);
    div.prepend(zag);
    zam.prepend(div);
    document.body.querySelector('.main-text').value = '';
    document.body.querySelector('.name').value = '';
  }
}