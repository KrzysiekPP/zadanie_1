
var dragging = null;
var list = document.getElementById('list');
var new_element_text = "1";
var count = 1;
var border_style = 'solid 2px red';

var database_var = 'customerDB';
var table_var = 'clients';

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

  var request = indexedDB.open(database_var, 1);

  request.onupgradeneeded = function(e){

    db = e.target.result;

    if(!db.objectStoreNames.contains(table_var)){
      var os = db.createObjectStore(table_var,{keyPath: "id", autoIncrement:true});
      os.createIndex('email','email',{unique:false});
    }
  }

  request.onsuccess = function(e){
    console.log('Database opened!');
    db = e.target.result;
		showCustomers();
  }

  request.onerror = function(e){
    console.log('Database opening error!');
  }
};

function remove(elem) {
  elem.parentElement.remove();
}
/*
function loadData() {

    const request = db.transaction(table_var).objectStore(table_var).get(0);

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
*/

function saveData() {
  var customer = getUserData();
  var transaction = db.transaction([table_var], 'readwrite');

  var objectStore = transaction.objectStore(table_var);

  var request = objectStore.add(customer);
  request.onsuccess = () => {
      console.log('Added new student');
      showCustomers();
  }
}
function showCustomers(e){
	var transaction = db.transaction([table_var],"readonly");
	//Ask for ObjectStore
	var store = transaction.objectStore(table_var);
	var index = store.index('email');
	
	var output = '';
	index.openCursor().onsuccess = function(e){
		var cursor = e.target.result;
		if(cursor){
			output += "<tr id='customer_"+cursor.value.id+"'>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='email' data-id='"+cursor.value.id+"'>"+cursor.value.email+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='zipcode' data-id='"+cursor.value.id+"'>"+cursor.value.zipcode+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='nip' data-id='"+cursor.value.id+"'>"+cursor.value.nip+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='phone' data-id='"+cursor.value.id+"'>"+cursor.value.phone+"</span></td>";
      output += "<td><span class='cursor customer' contenteditable='true' data-field='dowod' data-id='"+cursor.value.id+"'>"+cursor.value.dowod+"</span></td>";
      output += "<td><a onclick='removeCustomer("+cursor.value.id+")' href=''>Delete</a></td>";
			output += "</tr>";
			cursor.continue();
		}
		document.getElementById("customers").innerHTML = output;
	}
}
function searching() {
  var record;
  //get input
  var datas = document.getElementById("myInput");
  
  //filtrowanie
  var f = datas.value.toUpperCase();
  var table = document.getElementById("myTable");
  var tr = table.getElementsByTagName("tr");
  var size_tr = tr.length;
  for (var i = 0; i < size_tr; i++) {
    var td = tr[i].getElementsByTagName("td");
    var size_td = td.length;
    for (var j = 0; j < size_td; j++) {
      if (td[j].innerHTML.toUpperCase().indexOf(f) > -1) record = true;
    }
    if(record != true) tr[i].style.display = "none";
    else{
      tr[i].style.display = "";
      record = false;
    }
  }
}




function removeCustomer(id){
	var transaction = db.transaction([table_var],"readwrite");
	//Ask for ObjectStore
	var store = transaction.objectStore(table_var);
	
	var request = store.delete(id);
	
	//Success
	request.onsuccess = function(){
		console.log('Client '+id+' Deleted');
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
  var diskAArray = ['c:\\windows\\temp','d:\\windows\\temp','e:\\windows\\temp','f:\\windows\\temp','g:\\windows\\temp'];
  var diskBArray = ['C:\\Windows\\temp','D:\\Windows\\temp','E:\\Windows\\temp','F:\\Windows\\temp','G:\\Windows\\temp'];
  var ip6Array = ['2001:0db8:85a3:0000:0000:8a2e:0370:7334','2551:0db8:8553:0200:0300:6a2e:0370:7334','2001:0db7:85b3:0000:0000:3b2a:7378:7147','7002:0ea8:85b5:0000:0000:8a2e:0370:7334','3551:0e68:35b3:0000:0000:8a3e:0370:7334'];
  var catalogArray = ['/etc/passwd','/etc/hhh','/etc/options','/etc/modules','/etc/por'];
  var phoneArray = ['492-492-492','333-999-222','436-111-452','112-499-477','782-411-495'];

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
  value = generateRandomIntegerInRange(0, 4);
  diskA.value = diskAArray[value];
  value = generateRandomIntegerInRange(0, 4);
  diskB.value = diskBArray[value];
  value = generateRandomIntegerInRange(0, 4);
  catalog.value = catalogArray[value];
  value = generateRandomIntegerInRange(0, 4);
  ip6.value = ip6Array[value];
  value = generateRandomIntegerInRange(0, 4);
  phone.value = phoneArray[value];
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
  var customer = {
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
  return customer;
}


