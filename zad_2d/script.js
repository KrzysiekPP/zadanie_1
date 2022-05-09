
var dragging = null;
var list = document.getElementById('list');
var new_element_text = "1";
var border_style = 'solid 2px red';

//ADD EVENT TO ITEM's BUTTON (REMOVING)
list.addEventListener('click', function(e){
    if(e.target && e.target.nodeName == "BUTTON") {
      e.target.parentNode.remove();
    }
});


  
//DRAG START EVENT, INITIALIZE VAR draggin WITH SOURCE OF EVENT
document.addEventListener('dragstart', function(event) {
    var target = getLI(event.target);
    dragging = target;
});

//WHEN DRAGGING CREATE BORDER
document.addEventListener('dragover', function(event) {
    event.preventDefault();
    var target = getLI(event.target);
    var bounding = target.getBoundingClientRect();
    var offset = bounding.y + (bounding.height/2);
    if (event.clientY - offset > 0) {
        target.style['border-top'] = '';
        target.style['border-bottom'] = border_style;
    } else {
        target.style['border-top'] = border_style;
        target.style['border-bottom'] = '';
    }
});

//WHEN DRAGGING DONE DELETE BORDER
document.addEventListener('dragleave', function(event) {
    var target = getLI(event.target);
    target.style['border-bottom'] = '';
    target.style['border-top'] = '';
});

//WHEN DROP CHECK LIST, WHEN ITEM SHOULD BE INSERTED
document.addEventListener('drop', function(event) {
    event.preventDefault();
    var target = getLI( event.target );
    if ( target.style['border-bottom'] !== '') {
        target.style['border-bottom'] = '';
        target.parentNode.insertBefore(dragging, event.target.nextSibling);
    } else {
        target.style['border-top'] = '';
        target.parentNode.insertBefore(dragging, event.target);
    }
});

//FUNCTION RETURNING TARGET (LI ITEM)
function getLI(target) {

    while (target.nodeName != 'LI' && target.nodeName != 'BODY') target = target.parentNode;
    if (target.nodeName == 'BODY') return false;
    return target;
}

let db;

 

window.onload = () => {

  //Open Database

  var request = indexedDB.open('userData', 1);

  request.onupgradeneeded = function(e){

    db = e.target.result;

    if(!db.objectStoreNames.contains('user')){

      var objectStore = db.createObjectStore('user', { keyPath: 'id' });
      objectStore.createIndex('id', 'id', { unique: true });
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('zipcode', 'zipcode', { unique: false });
      objectStore.createIndex('nip', 'nip', { unique: false });
      objectStore.createIndex('dowod', 'dowod', { unique: false });
      objectStore.createIndex('ip4', 'ip4', { unique: false });
      objectStore.createIndex('www', 'www', { unique: false });
      objectStore.createIndex('diskA', 'diskA', { unique: false });
      objectStore.createIndex('diskB', 'diskB', { unique: false });
      objectStore.createIndex('ip6', 'ip6', { unique: false });
      objectStore.createIndex('catalog', 'catalog', { unique: false });
      objectStore.createIndex('phone', 'phone', { unique: false });
 

      // Transaction completed

      objectStore.transaction.oncompleted = (e)=> {
        console.log('Object store "student" created');
        const transaction = db.transaction(['user'], 'readwrite');
        const objectStore = transaction.objectStore('user');
        // Add new user
        const request = objectStore.add(getUserData());

        request.onsuccess = ()=> {
            console.log('New user added!');
        }

        request.onerror = (err)=> {
            console.error('Error in adding new user!');
        }
      }
    }
  }

  request.onsuccess = function(e){
    console.log('Database opened!');
    db = e.target.result;
  }

  request.onerror = function(e){
    console.log('Database opening error!');
  }
};

function remove(elem) {
  elem.parentElement.remove();
}

function loadData() {

    const request = db.transaction('user').objectStore('user').get(0);

    request.onsuccess = ()=> {
      const user = request.result;
      document.getElementById('email').value = user.email;
      document.getElementById('zipcode').value = user.zipcode;
      document.getElementById('nip').value = user.nip;
      document.getElementById('dowod').value = user.dowod;
      document.getElementById('www').value = user.www;
      document.getElementById('diskA').value = user.diskA;
      document.getElementById('diskB').value = user.diskB;
      document.getElementById('ip6').value = user.ip6;
      document.getElementById('ip4').value = user.ip4;
      document.getElementById('catalog').value = user.catalog;
      document.getElementById('phone').value = user.phone;
    }

    request.onerror = (err)=> {
        console.error(`Error on loadData() function`)
    }
}

function saveData() {
  var newUser = getUserData();
  const transaction = db.transaction(['user'], 'readwrite');
  const objectStore = transaction.objectStore('user');
  const request = objectStore.get(0);
  request.onsuccess = () => {
    const updateRequest = objectStore.put(newUser);
    updateRequest.onsuccess = () => {
      console.log('Added new student');
    }
  }
}

function exampleText() {
  var email = document.getElementById('email');
  var zipcode = document.getElementById('zipcode');
  var nip = document.getElementById('nip');
  var dowod = document.getElementById('dowod');
  var ip4 = document.getElementById('ip4');
  var www = document.getElementById('www');
  var diskA = document.getElementById('diskA');
  var diskB = document.getElementById('diskB');
  var ip6 = document.getElementById('ip6');
  var catalog = document.getElementById('catalog');
  var phone = document.getElementById('phone');
  email.value = "raz@gmail.com";
  zipcode.value = "91-112";
  nip.value = "100-10-20-200";
  dowod.value = "ABC 123456";
  ip4.value = "192.168.1.1";
  www.value = "www.google.com";
  diskA.value = 'c:\\windows\\temp';
  diskB.value = "C:\\Windows\\temp";
  catalog.value = "/etc/passwd";
  ip6.value = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
  phone.value = "492-492-492";

}

function clearText() {
  var email = document.getElementById('email');
  var zipcode = document.getElementById('zipcode');
  var nip = document.getElementById('nip');
  var dowod = document.getElementById('dowod');
  var ip4 = document.getElementById('ip4');
  var www = document.getElementById('www');
  var diskA = document.getElementById('diskA');
  var diskB = document.getElementById('diskB');
  var ip6 = document.getElementById('ip6');
  var catalog = document.getElementById('catalog');
  var phone = document.getElementById('phone');
  email.value = "";
  zipcode.value = "";
  nip.value = "";
  dowod.value = "";
  ip4.value = "";
  www.value = "";
  diskA.value = "";
  diskB.value = "";
  catalog.value = "";
  ip6.value = "";
  phone.value = "";

}

function getUserData() {

  var email = document.getElementById('email').value;
  var zipcode = document.getElementById('zipcode').value;
  var nip = document.getElementById('nip').value;
  var dowod = document.getElementById('dowod').value;
  var ip4 = document.getElementById('ip4').value;
  var www = document.getElementById('www').value;
  var diskA = document.getElementById('diskA').value;
  var diskB = document.getElementById('diskB').value;
  var ip6 = document.getElementById('ip6').value;
  var catalog = document.getElementById('catalog').value;
  var phone = document.getElementById('phone').value;

  return {
    id: 0,
    email: email,
    zipcode: zipcode,
    ip4: ip4,
    nip: nip,
    dowod: dowod,
    www: www,
    diskA: diskA,
    diskB: diskB,
    ip6: ip6,
    catalog: catalog,
    phone: phone
  }
}


