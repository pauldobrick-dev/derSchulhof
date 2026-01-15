"use strict";

//Mit dieser Funktion soll ein neuer Post erstellt werden.
function post_erstellen()
{
    console.log("post_erstellen() wird ausgefuehrt");

    //Post Inhalt
    const p = document.getElementById("neu").value.trim();

    if (p !== "") post = p;

}