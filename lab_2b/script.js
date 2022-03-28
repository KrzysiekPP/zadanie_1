
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



