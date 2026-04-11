# Next Generation Business &mdash; Sito Web

Repository contenente l'intera struttura del sito **[nextgenerationbusiness.it](https://nextgenerationbusiness.it/)**: la landing principale del ciclo di convegni + le landing dei singoli eventi.

Questo repo è la **fonte di verit&agrave;** per lo sviluppo. I file vengono poi sincronizzati con il repo `amissori-coder/LandingVerona` che è quello effettivamente collegato al dominio.

## 📂 Struttura

```
.
├── README.md                         (questo file)
├── index.html                        ← landing principale del ciclo
├── styles.css                        ← stili landing principale
├── script.js                         ← script landing principale
└── roma_aprile_2026/                 ← evento di Roma (29 aprile 2026)
    ├── index.html
    ├── styles.css
    ├── script.js
    ├── assets/ (5 loghi PNG)
    └── README.md
```

## 🌐 Come corrisponde agli URL

| URL | Cartella nel repo |
|---|---|
| `https://nextgenerationbusiness.it/` | root (`index.html`) |
| `https://nextgenerationbusiness.it/roma_aprile_2026/` | `roma_aprile_2026/` |
| `https://nextgenerationbusiness.it/verona_marzo_2026/` | (gestito a parte nel repo `LandingVerona`) |

## ✏️ Come modificare

### Per cambiare la landing principale
Modifica direttamente `index.html`, `styles.css`, `script.js` alla root.

### Per cambiare il sito di Roma
Modifica i file dentro `roma_aprile_2026/`.

### Per aggiungere un nuovo evento (es. Milano settembre 2026)
1. Crea la cartella `milano_settembre_2026/`
2. Copia dentro `index.html`, `styles.css`, `script.js` e le `assets/` partendo da `roma_aprile_2026/` come template
3. Personalizza testi, date, relatori, loghi
4. Apri `index.html` alla root (la landing principale) e aggiungi una nuova `<a class="event-card">` nella griglia `events-grid` con i dati del nuovo evento
5. Sposta l'evento precedente da `event-upcoming` a `event-past` se necessario

## 🚀 Deploy su nextgenerationbusiness.it

Questo repo non è collegato direttamente al dominio. Il dominio è configurato sul repo `amissori-coder/LandingVerona`. Per pubblicare le modifiche devi **sincronizzare** i file di questo repo in quello.

### Sincronizzazione manuale (via GitHub Desktop)

1. Apri in locale entrambi i repo clonati:
   - `amissori-coder/29.04` (questo &mdash; fonte di verit&agrave;)
   - `amissori-coder/LandingVerona` (produzione collegata al dominio)
2. Da Esplora Risorse/Finder, copia **tutto il contenuto** di `29.04/` tranne:
   - `.git/`
   - `README.md` (opzionale, puoi tenere quello di produzione)
3. Incollalo nella root di `LandingVerona/`, sovrascrivendo i file esistenti
4. **Non toccare** il file `CNAME` nella root di `LandingVerona` &mdash; deve rimanere
5. **Non toccare** la cartella `verona_marzo_2026/` in `LandingVerona` &mdash; gestita separatamente
6. Torna su GitHub Desktop (con il repo `LandingVerona` aperto), verifica le modifiche, committa e fai push
7. Attendi 1-2 minuti per il deploy di GitHub Pages

### Verifica post-deploy

Apri in **finestra incognito** per evitare la cache:
- `https://nextgenerationbusiness.it/` &rarr; nuova landing
- `https://nextgenerationbusiness.it/roma_aprile_2026/` &rarr; evento Roma
- `https://nextgenerationbusiness.it/verona_marzo_2026/` &rarr; evento Verona (gi&agrave; presente)

## 🎨 Tecnologie

- **HTML5 + CSS3 + vanilla JavaScript** (nessun build step, nessuna dipendenza)
- **Google Fonts**: Montserrat (titoli) + Inter (body)
- **Palette coerente** su tutti i siti: navy Revilaw (`#164068`) + rosso Advant (`#B1213B`)
- **Lenis 1.1.20** per lo smooth scrolling del sito Roma (CDN unpkg)
- **Percorsi relativi** ovunque &mdash; ogni sito funziona da qualsiasi sottocartella

## ⚠️ Note importanti

- Il file `CNAME` del dominio deve stare **solo** nel repo `LandingVerona`, **non** in questo repo
- Le cartelle degli eventi sono self-contained: ogni sito ha il suo `index.html`, `styles.css`, `script.js` e `assets/` interni
- I nomi delle cartelle degli eventi sono **case-sensitive** su GitHub Pages: usa sempre il minuscolo (`roma_aprile_2026/`, `verona_marzo_2026/`, ecc.)
