let przyslowia = [
    "Pasuje jak trzecia koza do woza",
    "Lepszy bocian w garści niż wróbel w garażu",
    "Gdzie kucharek sześć tam nie ma co żreć",
    "Prawdziwych przyjaciół poznaje się po obiedzie"
]
let randomIndex = 0;
getRandomIndex();
let haslo = przyslowia[randomIndex];
let success = new Audio("success.mp3");
let error = new Audio("error.mp3");
let win = new Audio("win.mp3");
let lose = new Audio("lose.wav");
let punktacja = haslo.length;
let punktacja2 = haslo.replace(/\s/g, "");
let longer = punktacja2.length;




function getRandomIndex() {
    randomIndex = Math.floor(Math.random() * 4)
}
haslo = haslo.toUpperCase();
let dlugosc = haslo.length;
let haslo1 = "";
let fail = 0;
let zgadnieta = 0;
let table = [
    "A",
    "Ą",
    "B",
    "C",
    "Ć",
    "D",
    "E",
    "Ę",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "Ł",
    "M",
    "N",
    "Ń",
    "O",
    "Ó",
    "P",
    "Q",
    "R",
    "S",
    "Ś",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Ż",
    "Ź"
]

function punkty() {
    longer = longer - 1;
    document.querySelector(".hit").classList.add("animation1");
    document.querySelector(".xpkt").innerHTML = `Ustrzel hasło za ${longer} pkt!`;
}

for (let i = 0; i < dlugosc; i++) {
    if (haslo.charAt(i) == " ") {
        haslo1 = haslo1 + " "
    } else {
        haslo1 = haslo1 + "-"
    }
}

function wypisz() {
    let element = document.querySelector(".board")
    element.innerHTML = haslo1;
}
window.onload = start;

function start() {
    let fullAlphabet = "";
    for (let i = 0; i < 35; i++) {
        let litnr = "lit" + i;
        //fullAlphabet = `${fullAlphabet}<div class="litera" id="${litnr}" onclick="guess(${i});">${table[i]}</div>`;
        fullAlphabet = fullAlphabet + '<div class="litera" onclick="guess(' + i + ')" id="' + litnr + '">' + table[i] + '</div>';
    }
    let alfabet = document.querySelector(".alphabet")
    alfabet.innerHTML = fullAlphabet;
    wypisz()
}

String.prototype.ustawZnak = function (miejsce, znak) {
    if (miejsce > this.length - 1) return this.toString();
    else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
}

function guess(nr) {
    let trafiona
    for (let i = 0; i < dlugosc; i++) {
        if (haslo.charAt(i) == table[nr]) {
            haslo1 = haslo1.ustawZnak(i, table[nr]);
            trafiona = true;
            zgadnieta++;
            wypisz();
            punkty();
        }
    }
    if (trafiona == true) {
        success.play();
        let element = "#lit" + nr;
        document.querySelector(element).style.color = "green";
        document.querySelector(element).style.border = "3px solid green";
        document.querySelector(element).style.cursor = "default";
        document.querySelector(element).setAttribute("onclick", ";");
    } else {
        error.play();
        let element = "#lit" + nr;
        document.querySelector(element).style.color = "red";
        document.querySelector(element).style.border = "3px solid red";
        document.querySelector(element).style.cursor = "default";
        document.querySelector(element).setAttribute("onclick", ";");
        fail++;
        let obraz = `obrazy/s${fail}.jpg`;
        document.querySelector(".hang").innerHTML = `<img src="${obraz}" alt="obrazek">`;
    }

    if (haslo1 === haslo) {
        win.play();
        document.querySelector(".alphabet").innerHTML = `<span class="winner">Wygrałeś! <br><br> Prawidłowe hasło to ${haslo} </span><br><br> <span class="reset" onclick="location.reload()">Spróbuj ponownie?</span>`;
        document.querySelector(".board").style.color = "green";
        document.querySelector(".hit").classList.add("animation1");
        document.querySelector(".xpkt").innerHTML = `Wygrałeś! Twój wynik to: ${longer} pkt!`;
        document.querySelector(".xpkt").style.color = "green";
    }
    if (fail == 9) {
        lose.play();
        document.querySelector(".alphabet").innerHTML = `<span class="loser">Fatalnie! <br><br> Niestety nie udało Ci się odgadnąć popularnego przysłowia </span><br><br> <span class="reset" onclick="location.reload()">Spróbuj ponownie?</span>`;
        document.querySelector(".board").style.color = "red";
        document.querySelector(".hit").style.display = "none";
    }
}

function answer() {
    let odpowiedz = prompt("Jaka jest Twoja odpowiedź?");
    if (odpowiedz.toUpperCase() === haslo) {
        haslo1 = haslo;
        win.play();
        document.querySelector(".alphabet").innerHTML = `<span class="winner">Wygrałeś! <br><br> Prawidłowe hasło to ${haslo} </span><br><br> <span class="reset" onclick="location.reload()">Spróbuj ponownie?</span>`;
        document.querySelector(".board").style.color = "green";
        document.querySelector(".hit").classList.add("animation1");
        document.querySelector(".xpkt").innerHTML = `Wygrałeś! Twój wynik to: ${longer} pkt!`;
        document.querySelector(".xpkt").style.color = "green";
    } else {
        alert("Niestety, to nie jest prawidłowa odpowiedź, słabo znasz się na przysłowiach... Próbuj dalej!");
    }
}