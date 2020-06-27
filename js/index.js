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

function setEuroParam(euroWert) {
    let url = window.location.href;
    const end = url.lastIndexOf("?");
    url = url.slice(0, end === -1 ? url.length : end) + "?euro=" + euroWert;
    history.replaceState("", url, url);
}

function setzeAlleFelder (euroWert, ignoriert) {
    setEuroParam(euroWert.toString().replace(".", ","));
    for (let i = 0; i < 4; i++) {
        const wert = bekommeAnzeigeWert(euroWert * multiplikator[i]);
        felder[i].placeholder = wert;
        if (i !== ignoriert) {
            felder[i].classList.remove("fehler");
            felder[i].value = wert;
        }
    }

    output.value = (felder[0].value + " Euro, das sind ja " + felder[1].value + " Mark; " + felder[2].value + " Ostmark und " + felder[3].value + " Ostmark auf dem Schwarzmarkt!").replace(/\./g, ",").replace(/,00/g, "");
}

for (let i = 0; i < 4; i++) {
    felder[i].pattern = regex;
    felder[i].title = "Geldwert mit zwei Nachkommastellen.";
    felder[i].oninput = function () {
        if (regex.test(felder[i].value)) {
            felder[i].classList.remove("fehler");
            setzeAlleFelder(felder[i].value.replace(",", ".") / multiplikator[i], i);
        } else {
            felder[i].classList.add("fehler");
        }
    }
}

function getEuroParamFromURL(){
    let results = new RegExp('[\?&]euro=([^&#]*)').exec(window.location.href);
    return results === null ? (Math.random() > 0.4 ? 16 : 5120) : results[1].replace(",", "."); //5120
}

setzeAlleFelder(getEuroParamFromURL(), -1);