# Chatforum - "Der Schulhof"

---
## Starten des Backends
Das Backend besteht aus einer Kombination von sqlite3 und express.js. Um das Backend zu starten müssen folgende Schritte durchgeführt werden.
1. Auf dem Host-Gerät muss in `"chatforum/backend/src"` navigiert werden
2. Mit dem Befhel `"node server.js"` wird das Backend gestartet und ist nun an folgenden Adressen erreichbar:


## IP des Host Geräts
Bspw.: **_http://172.26.208.107_**
- Port: **_:3000_**


## Schnittstellen
Alle Backend-Schnittstellen werden im Zweig `/api` dargestellt

**Registrierung/Login**

`/auth`

- Login: `/login`
- Registerierung: `/register`

Beispielsweise lässt sich das Backend, welches für den Login zuständig ist unter folgender IP-Adresse erreichen: http://hostadresse:3000/api/auth/login


