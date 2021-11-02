"use strict"

let elem1;

document.body.querySelector('.vashi-zametki').addEventListener('click', addclick);

function addclick(event) {
  
  let clck = event.target;

  if(clck.className == 'delete') {
    clck.closest('.zam').remove();
  }

  if(clck.className == "edit") {
    document.body.querySelector('.vvod-red').style.display = 'flex';
    elem1 = clck.parentNode;
    document.body.querySelector('.main-text-red').value = elem1.querySelector('.p-text').textContent;
    document.body.querySelector('.name-red').value = elem1.querySelector('.zagg').textContent;
  }

  if(clck.closest('.zam') && !(clck.className == "edit")) {
    clck.closest('.zam').classList.toggle('close-zam');
    clck.closest('.zam').querySelector('.delete').classList.toggle('close');
    clck.closest('.zam').querySelector('.edit').classList.toggle('close');
  }
};

document.body.querySelector('.new-zametka').addEventListener('click', () => {
  document.body.querySelector('.vvod').style.display = 'flex';
  for(let elem of document.body.querySelectorAll('.zam')) {
    elem.classList.remove('close-zam');
    elem.querySelector('.delete').classList.add('close');
    elem.querySelector('.edit').classList.add('close');
  }
});

document.addEventListener('touchstart', function(event) {
  let x = event.changedTouches[0].clientX;
  let down = event.target;
  let l;
  if(down.closest('.zam')) {
    let elem = down.closest('.zam');
    document.ontouchmove = function(event) {
      l = event.changedTouches[0].clientX - x;
      if(l < 0) {
        elem.style.left = l + 'px';
      }
      if(l < -60) {
        elem.style.backgroundColor = 'red';
      } else elem.style.backgroundColor = "";
    }
    document.ontouchend = function() {
      document.ontouchmove = null;
      if(l < -60) {
        elem.remove();
      } else {
        elem.style.left = "";
      }
    }
  }

});

document.body.querySelector('.vvod').addEventListener('click', function(event) {
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
})

document.body.querySelector('.vvod-red').addEventListener('click', function(event) {
  let elem = event.target;

  if(elem.className == 'otmen-red') {
    document.body.querySelector('.name-red').value = '';
    document.body.querySelector('.main-text-red').value = '';
    document.body.querySelector('.vvod-red').style.display = 'none';
  }

  if(elem.className == 'vvod-data-red') {
    if(document.body.querySelector('.name-red').value == '') {
      elem1.querySelector('.zagg').textContent = 'Без название';
    } else {
      elem1.querySelector('.zagg').textContent = document.body.querySelector('.name-red').value;
    }
    elem1.querySelector('.p-text').textContent = document.body.querySelector('.main-text-red').value;
    document.body.querySelector('.name-red').value = '';
    document.body.querySelector('.main-text-red').value = '';
    document.body.querySelector('.vvod-red').style.display = 'none';
  }
})