# Next Generation Business — Landing principale (root)

Landing page principale per il dominio **[nextgenerationbusiness.it](https://nextgenerationbusiness.it/)**.

Questa cartella contiene i **tre file** che dovranno stare **alla root** del repository `amissori-coder/LandingVerona`, accanto al file `CNAME` e alle sottocartelle `verona/` e `roma_aprile_2026/`.

## 📂 File inclusi

```
nextgen_root/
├── index.html      # la landing page principale
├── styles.css      # stili (stessa palette di Revilaw/Advant per coerenza)
├── script.js       # navbar scroll + smooth anchor links
└── README.md       # questo file (da NON copiare nel repo principale)
```

## 🚀 Come deployarla

### Obiettivo

Far sì che la root del repository `LandingVerona` contenga:

```
CNAME                         ← già presente, NON toccare
README.md                     ← già presente
index.html                    ← NUOVO (da nextgen_root/)
styles.css                    ← NUOVO (da nextgen_root/)
script.js                     ← NUOVO (da nextgen_root/)
verona_marzo_2026/            ← già presente (evento di marzo)
roma_aprile_2026/             ← già copiata
```

### Passi con GitHub Desktop

1. Apri in locale il repository `LandingVerona` (clonato in precedenza).
2. Prendi i **tre file** `index.html`, `styles.css`, `script.js` dalla cartella `nextgen_root/` di questo repository (`amissori-coder/29.04`).
3. **Copiali** e incollali **alla root** del repository `LandingVerona` — allo stesso livello di `CNAME`, non dentro `verona/` o `roma_aprile_2026/`.
4. Torna su GitHub Desktop: vedrai comparire 3 nuovi file.
5. Nel campo **"Summary"** scrivi: `Add main landing page`
6. Clicca **"Commit to main"**
7. Clicca **"Push origin"**

### Verifica post-deploy

Attendi 1-2 minuti e apri in **finestra in incognito**:

- `https://nextgenerationbusiness.it/` → deve mostrare la **nuova landing** con le card Verona e Roma
- `https://nextgenerationbusiness.it/verona_marzo_2026/` → deve continuare a funzionare come prima
- `https://nextgenerationbusiness.it/roma_aprile_2026/` → deve continuare a funzionare come prima

## ⚠️ Cose da verificare

### 1. Giorno esatto dell'evento Verona

La card Verona mostra `Marzo 2026` come periodo. Se conosci il **giorno esatto** dell'evento di Verona, apri `index.html` e sostituisci il trattino lungo con il numero del giorno:

```html
<span class="event-day">&mdash;</span>    ← sostituisci — con il giorno (es. 12)
```

### 2. Titolo e descrizione Verona

Il titolo e la descrizione dell'evento Verona sono placeholder generici. Se vuoi personalizzarli cerca in `index.html`:

```html
<h3 class="event-title">Next Generation Business · Verona</h3>
<p class="event-excerpt">La prima tappa del ciclo di convegni, tenutasi a Verona nel marzo 2026. Rivedi i contenuti dell'edizione inaugurale.</p>
```

e sostituiscili con i dati reali del convegno.

### 3. Il file `CNAME` alla root

Non toccarlo. Deve rimanere **alla root** del repository `LandingVerona` con il contenuto esatto:

```
nextgenerationbusiness.it
```

## 🎨 Design e tecnologie

- **HTML5 + CSS3 + vanilla JavaScript** — nessun build step, nessuna dipendenza
- **Google Fonts**: Montserrat (display) + Inter (body)
- **Palette coerente** con i sotto-siti: navy Revilaw + rosso Advant come accento
- **Responsive** su tutti i device: desktop, tablet, smartphone
- **No Lenis / no scroll-snap**: la landing principale usa smooth scroll nativo per massima compatibilità e velocità

## 📅 Quando aggiungi un nuovo evento

Per aggiungere un nuovo evento al ciclo (es. un futuro convegno a Milano):

1. Crea la sottocartella del nuovo evento nel repo principale, es. `milano_settembre_2026/`
2. Apri `index.html` alla root
3. Duplica uno dei blocchi `<a class="event-card">` nella grid `events-grid`
4. Aggiorna i dati: città, data, titolo, excerpt, link
5. Se è il prossimo evento, cambia la classe in `event-upcoming` e il badge in `Prossimo Evento`
6. Se l'evento di Roma è diventato "passato", cambialo in `event-past`
7. Commit + push

La grid si adatterà automaticamente: su desktop mostra 2 colonne, su mobile 1 colonna.
