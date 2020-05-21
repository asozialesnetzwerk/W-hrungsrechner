const euroFeld = document.getElementById("euro");
const markFeld = document.getElementById("mark");
const ostMarkFeld = document.getElementById("ost-mark");
const schwarzMarkFeld = document.getElementById("schwarz-mark");

const euro = 1;
const mark = 2;
const ostMark = 4;
const schwarzMark = 20;

function setzeAlleFelder(euroWert) {
    euroFeld.value = euroWert;
    markFeld.value = euroWert * mark;
    ostMarkFeld.value = euroWert * ostMark;
    schwarzMarkFeld.value = euroWert * schwarzMark;
}

function addEditListener (eingabeFeld, geldWert) {
    eingabeFeld.oninput = function() {
        setzeAlleFelder(eingabeFeld.value / geldWert);
    }
}

addEditListener(euroFeld, euro);
addEditListener(markFeld, mark);
addEditListener(ostMarkFeld, ostMark);
addEditListener(schwarzMarkFeld, schwarzMark);

setzeAlleFelder(1);