"use strict";

//Variablen für 
let vorname = "vorname";
let nachname = "nachname";

//Namen anzeigen
function name_anzeigen() {
    console.log("name_anzeigen() wird ausgefuehrt");
    const feld = document.getElementById("Anzeige");
    feld.textContent = `Hallo ${vorname} ${nachname}!`;
}

//Namen aus den Input-Feldern uebernehmen
function name_aendern() {
    console.log("name_aendern() wird ausgefuehrt");
    const v = document.getElementById("Vorname").value.trim();
    const n = document.getElementById("Nachname").value.trim();

    if (v !== "") vorname = v;
    if (n !== "") nachname = n;

    name_anzeigen(); //Anzeige aktualisieren
}

//Button mit Funktion verbinden
document.getElementById("speichern").addEventListener("click", name_aendern);

//Name sofort am Anfang anzeigen
name_anzeigen();
