const felder = [
    document.getElementById("euro"),
    document.getElementById("mark"),
    document.getElementById("ost-mark"),
    document.getElementById("schwarz-mark")
];

const multiplikator = [
    1, //Euro
    2, //Deutsche Mark
    4, //Ostmark
    20 //Ostmark auf dem Schwarzmarkt
];

const regex = /^\d*[.,]\d{2}$/;

for (let i = 0; i < 4; i++) {
    felder[i].pattern = regex;
    felder[i].title = "Geldwert mit zwei Nachkommastellen.";
}

function bekommeAnzeigeWert (wert) {
    const str = wert.toString().replace(".", ",");
    if (regex.test(str)) {
        return str;
    }
    const split = str.split(",");
    if (split.length === 1) {
        return str + ",00";
    } else {
        return split[0] + "," + (split[1] + "00").slice(0, 2);
    }
}

function setzeAlleFelder (euroWert, ignoriert) {
    for (let i = 0; i < 4; i++) {
        const wert = bekommeAnzeigeWert(euroWert * multiplikator[i]);
        felder[i].placeholder = wert;
        if (i !== ignoriert) {
            felder[i].classList.remove("fehler");
            felder[i].value = wert;
        }
    }
}

for (let i = 0; i < 4; i++) {
    felder[i].oninput = function () {
        if (regex.test(felder[i].value)) {
            felder[i].classList.remove("fehler");
            setzeAlleFelder(felder[i].value.replace(",", ".") / multiplikator[i], i);
        } else {
            felder[i].classList.add("fehler");
        }
    }
}

setzeAlleFelder(16, -1);