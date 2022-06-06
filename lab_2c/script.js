
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
function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function exampleText() {
  var emailArray = ['raz@gmail.com', 'dwa@gmail.com','pelikan@gmail.com','janek@gmail.com','piotrek@wp.com'];
  var zipcodeArray = ['91-112', '93-115','83-100','15-112','11-111'];
  var nipArray = ['100-10-20-200', '999-19-29-299','291-00-10-800','299-01-15-803','295-03-11-823'];
  var dowodArray = ['ABC 123456', 'DEF 125456','DZE 512523','DTT 512123','PPA 124123'];
  var ip4Array = ['192.168.1.1', '192.168.1.5','192.168.1.3','192.168.1.2','192.168.1.4'];
  var wwwArray = ['www.google.com', 'www.google.pl','www.wp.pl','www.politechnika.com','www.adrian.com'];

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

  let value = generateRandomIntegerInRange(0, 4);
  email.value = emailArray[value];
  value = generateRandomIntegerInRange(0, 4);
  zipcode.value = zipcodeArray[value];
  value = generateRandomIntegerInRange(0, 4);
  nip.value = nipArray[value];
  value = generateRandomIntegerInRange(0, 4);
  dowod.value = dowodArray[value];
  value = generateRandomIntegerInRange(0, 4);
  ip4.value = ip4Array[value];
  value = generateRandomIntegerInRange(0, 4);
  www.value = wwwArray[value];
  diskA.value = 'c:\\windows\\temp';
  diskB.value = "C:\\Windows\\temp";
  catalog.value = "/etc/passwd";
  ip6.value = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
  phone.value = "492-492-492";
/*
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
*/
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


