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
CNAME                        ← già presente, NON toccare
README.md                    ← già presente
index.html                   ← NUOVO (da nextgen_root/)
styles.css                   ← NUOVO (da nextgen_root/)
script.js                    ← NUOVO (da nextgen_root/)
verona/                      ← già presente
roma_aprile_2026/            ← già copiata
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
- `https://nextgenerationbusiness.it/verona/` → deve continuare a funzionare come prima
- `https://nextgenerationbusiness.it/roma_aprile_2026/` → deve continuare a funzionare come prima

## ⚠️ Cose da verificare

### 1. Link alla cartella Verona

Nel file `index.html` (linea ~94) c'è il link alla cartella Verona:

```html
<a href="verona/" class="event-card event-past">
```

Il link presuppone che la cartella si chiami **`verona/`** (tutto minuscolo). Se nel repository principale la cartella si chiama ancora `Verona/` con la V maiuscola, **modifica il link** in:

```html
<a href="Verona/" class="event-card event-past">
```

### 2. Placeholder Verona da personalizzare

La card Verona ha dei testi generici che andranno personalizzati con i dati reali dell'evento che si è tenuto a Verona. Nel file `index.html` cerca questa sezione:

```html
<!-- Verona — edizione precedente -->
<a href="verona/" class="event-card event-past">
    <span class="event-badge">Edizione Precedente</span>
    <div class="event-date">
        <span class="event-day">—</span>
        <div class="event-date-meta">
            <span class="event-month">Verona</span>
            <span class="event-year">1ª Edizione</span>
        </div>
    </div>
    ...
    <h3 class="event-title">Next Generation Business · Verona</h3>
    <p class="event-excerpt">La prima tappa del ciclo di convegni, tenutasi a Verona. Rivedi i contenuti dell'edizione inaugurale.</p>
```

Sostituisci:
- `—` con il giorno (es. `15`)
- `Verona` con il mese (es. `Gennaio`)
- `1ª Edizione` con l'anno (es. `2026`)
- Il titolo con il titolo reale dell'evento di Verona
- L'excerpt con una breve descrizione

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
