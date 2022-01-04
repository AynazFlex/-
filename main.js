"use strict"

let elem1;

let openBase;
let db;

let start  = new Promise((resolve) => {
  window.onload = () => {
    resolve();
  }
})

start.then(() => {
  document.body.querySelector('.load-page').style.display = "none";
  openBase = indexedDB.open("notesBase", 1);
  openBase.onupgradeneeded = (event) => {
      db = event.target.result;
      if(!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', {keyPath: 'id'});
        alert("создана база данных для заметок");
      }
    }
  openBase.onsuccess = (event) => {
  db = event.target.result;
  let zam = document.body.querySelector('.vashi-zametki');
  let tran = db.transaction('notes', 'readwrite');
  let Notes = tran.objectStore('notes');
  let request = Notes.getAll();
  request.onsuccess = () => {
    for(let elem of request.result) {
      let div = document.createElement('div');
      div.classList.add('zam');
      div.id = elem.id;
      div.innerHTML = elem.HTMLcode;
      zam.prepend(div);
    }
    kolZam();
    document.body.querySelector('.vashi-zametki').addEventListener('click', addclick);
    document.body.querySelector('.new-zametka').addEventListener('click', () => {
      document.body.querySelector('.vvod').style.display = 'flex';
      for(let elem of document.body.querySelectorAll('.zam')) {
        elem.classList.remove('close-zam');
        elem.style.left = '';
        elem.querySelector('.delete').classList.add('close');
        elem.querySelector('.edit').classList.add('close');
        elem.querySelector('.p-text').classList.add('close');
      }
    });
  }
  }

  openBase.onerror = () => {
    alert('перезагрузите страницу');
  }

function addclick(event) {
  
  let clck = event.target;

  if(clck.className == 'delete' || clck.closest('.block')) {
    deleteBaseElem(clck.closest('.zam'));
    clck.closest('.zam').remove();
    kolZam();
  }

  if(clck.className == "edit") {
    document.body.querySelector('.vvod-red').style.display = 'flex';
    elem1 = clck.parentNode;
    document.body.querySelector('.text-input-red').innerHTML = elem1.querySelector('.p-text').innerHTML;
    document.body.querySelector('.name-red').value = elem1.querySelector('.zagg').textContent;
  }

  if(clck.closest('.zam') && !(clck.className == "edit")) {
    clck.closest('.zam').style.left = 0;
    clck.closest('.zam').classList.toggle('close-zam');
    clck.closest('.zam').querySelector('.delete').classList.toggle('close');
    clck.closest('.zam').querySelector('.edit').classList.toggle('close');
    clck.closest('.zam').querySelector('.p-text').classList.toggle('close');
  }
};

document.addEventListener('touchstart', function(event) {
  let x = event.changedTouches[0].clientX;
  let down = event.target;
  let l;
  if(down.closest('.zam')) {
    let elem = down.closest('.zam');
    console.log(parseInt(elem.style.left));
    if(elem.className === 'zam close-zam') return;
    document.ontouchmove = function(event) {
      l = event.changedTouches[0].clientX - x;
      if(l < 0) {
        elem.style.left = l + 'px';
      }
      if(l >= 0) {
        elem.style.left = 0;
      }
      if(l <= -80) {
        elem.style.left = -80 + 'px';
      }
    }
    document.ontouchend = function() {
      document.ontouchmove = null;
      if(l > -80) {
        elem.style.left = 0;
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
    let p = document.createElement('div');
    let t = document.createElement('span');
    let divDelete = document.createElement('div');
    divDelete.innerHTML = `<img src="delete.svg" class="for-img-delete"></img>`
    t.classList.add('time');
    p.classList.add('p-text');
    p.classList.add('close');
    zag.classList.add('zagg');
    button.classList.add('delete');
    button.classList.add('close');
    edit.classList.add('edit');
    edit.classList.add('close');
    divDelete.classList.add('block');
    edit.src = 'edit.svg';
    button.src = 'delete.svg';
    if(document.body.querySelector('.name').value == '') {
      zag.textContent = 'Без название';
    } else {
      zag.textContent = document.body.querySelector('.name').value;
    }
    p.innerHTML = document.body.querySelector('.text-input').innerHTML;
    t.textContent = `Время ${date.toLocaleTimeString().split(':').splice(0, 2).join(':')} Дата ${date.toLocaleDateString()}`;
    let timeForId = `${date.toLocaleDateString().split('.').reverse().join('')}${date.toLocaleTimeString().split(':').join('')}`;
    div.prepend(divDelete)
    div.prepend(t);
    div.prepend(button);
    div.prepend(edit);
    div.prepend(p);
    div.prepend(zag);
    div.id = timeForId;
    zam.prepend(div);
    let obj = {
      id: timeForId,
      HTMLcode: div.innerHTML,
    }
    let tran = db.transaction('notes', 'readwrite');
    let Notes = tran.objectStore('notes');
    let addNote = Notes.put(obj);
    addNote.onerror = () => {
      Notes.add(obj);
    }
    kolZam();
    document.body.querySelector('.text-input').innerHTML = '';
    document.body.querySelector('.name').value = '';
  }
})

document.body.querySelector('.vvod-red').addEventListener('click', function(event) {
  let elem = event.target;

  if(elem.className == 'otmen-red') {
    document.body.querySelector('.name-red').value = '';
    document.body.querySelector('.text-input-red').innerHTML = '';
    document.body.querySelector('.vvod-red').style.display = 'none';
  }

  if(elem.className == 'vvod-data-red') {
    if(document.body.querySelector('.name-red').value == '') {
      elem1.querySelector('.zagg').textContent = 'Без название';
    } else {
      elem1.querySelector('.zagg').textContent = document.body.querySelector('.name-red').value;
    }
    elem1.querySelector('.p-text').innerHTML = document.body.querySelector('.text-input-red').innerHTML;
    let tran = db.transaction('notes', 'readwrite');
    let Notes = tran.objectStore('notes');
    elem1.querySelector('.delete').classList.add('close');
    elem1.querySelector('.edit').classList.add('close');
    elem1.querySelector('.p-text').classList.add('close');
    let obj = {
      id: elem1.id,
      HTMLcode: elem1.innerHTML,
    }
    Notes.put(obj);
    elem1.querySelector('.delete').classList.remove('close');
    elem1.querySelector('.edit').classList.remove('close');
    elem1.querySelector('.p-text').classList.remove('close');
    document.body.querySelector('.name-red').value = '';
    document.body.querySelector('.text-input-red').innerHTML = '';
    document.body.querySelector('.vvod-red').style.display = 'none';
  }
})

document.body.querySelector('.vashi-zametki').onscroll = () => {
  let elem = document.body.querySelector('.vashi-zametki');
  if(elem.scrollTop >= elem.clientHeight/2) up.style.display = "block";
  else up.style.display = "";
}

up.onclick = () => {
  let timer = setInterval(() => {
    if(document.body.querySelector('.vashi-zametki').scrollTop == 0) clearInterval(timer);
    else document.body.querySelector('.vashi-zametki').scrollBy(0, -40);
  }, 20);
}

function kolZam() {
  let k = document.body.querySelectorAll('.zam').length;
  if(k > 1)
  i.textContent = k + " заметок";
  if(k == 1)
  i.textContent = k + " заметка";
  if(k == 0)
  i.textContent = '';
}

function deleteBaseElem(elem) {
  let tran = db.transaction('notes', 'readwrite');
  let Notes = tran.objectStore('notes');
  Notes.delete(elem.id);
}
})