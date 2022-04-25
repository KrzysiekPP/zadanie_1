
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

      objectStore.createIndex('postalCode', 'postalCode', { unique: false });

      objectStore.createIndex('nip', 'nip', { unique: false });

      objectStore.createIndex('idNumber', 'idNumber', { unique: false });

      objectStore.createIndex('ipv4', 'ipv4', { unique: false });

      objectStore.createIndex('url', 'url', { unique: false });

      objectStore.createIndex('win1', 'win1', { unique: false });

      objectStore.createIndex('win2', 'win2', { unique: false });

      objectStore.createIndex('ipv6', 'ipv6', { unique: false });

      objectStore.createIndex('etc', 'etc', { unique: false });

      objectStore.createIndex('phone', 'phone', { unique: false });

 

      // Transaction completed

      objectStore.transaction.oncompleted = (e)=> {

        console.log('Object store "student" created');

       

        const transaction = db.transaction(['user'], 'readwrite');

 

        const objectStore = transaction.objectStore('user');

 

        // Add new user

        const request = objectStore.add(getUserData());

 

        request.onsuccess = ()=> {

            console.log(`New user added, email: ${request.result}`);

        }

 

        request.onerror = (err)=> {

            console.error(`Error to add new user: ${err}`)

        }

      }

    }

  }

 

  request.onsuccess = function(e){

    console.log('Success: Opened Database...');

    db = e.target.result;

  }

 

  request.onerror = function(e){

    console.log('Error: Could Not Open Database...');

  }

};

 


function remove(elem) {

  elem.parentElement.remove();

}

 

function loadData() {

 const request = db.transaction('user')

                   .objectStore('user')

                   .get(0);

 

    request.onsuccess = ()=> {

      const user = request.result;

     

      document.getElementById('email').value = user.email;

      document.getElementById('postalCode').value = user.postalCode;

      document.getElementById('nip').value = user.nip;

      document.getElementById('idNumber').value = user.idNumber;

      document.getElementById('url').value = user.url;

      document.getElementById('win1').value = user.win1;

      document.getElementById('win2').value = user.win2;

      document.getElementById('ipv6').value = user.ipv6;

      document.getElementById('etc').value = user.etc;

      document.getElementById('phone').value = user.phone;

    }

 

    request.onerror = (err)=> {

        console.error(`Error to get student information: ${err}`)

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

      console.log(`Estudent updated, email: ${updateRequest.result}`);

    }

  }

}

 

function getUserData() {

  var email = document.getElementById('email').value;

  var postalCode = document.getElementById('zipcode').value;

  var nip = document.getElementById('nip').value;

  var idNumber = document.getElementById('dowod').value;

  var ipv4 = document.getElementById('ipv4').value;

  var url = document.getElementById('www').value;

  var win1 = document.getElementById('diskA').value;

  var win2 = document.getElementById('diskB').value;

  var ipv6 = document.getElementById('ipv6').value;

  var etc = document.getElementById('catalog').value;

  var phone = document.getElementById('phone').value;

 

  return {

    id: 0,

    email: email,

    postalCode: postalCode,

    ipv4: ipv4,

    nip: nip,

    idNumber: idNumber,

    url: url,

    win1: win1,

    win2: win2,

    ipv6: ipv6,

    etc: etc,

    phone: phone

  }

}


