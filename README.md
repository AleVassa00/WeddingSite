# WeddingSite — Veronica & Maurizio

Partecipazione digitale con apertura della busta, informazioni sul matrimonio,
regali e saluti.

## Installazione e avvio

Con Node.js `>=22.13.0` e npm:

```powershell
npm ci
npm run dev
```

Apri [http://localhost:5173/](http://localhost:5173/) o l'URL indicato da Vite.

## Visualizzazione dal telefono

Collega telefono e PC alla stessa rete locale e avvia Vite con:

```powershell
npm run dev -- --host 0.0.0.0
ipconfig
```

Apri `http://INDIRIZZO-IP-DEL-PC:5173/` dal telefono. Usa la porta mostrata da
Vite se è diversa. Tieni aperto il terminale mentre visualizzi l'anteprima.

## Verifica e build

```powershell
npm run validate
npm run preview
```

`validate` esegue typecheck, lint, test della validazione IBAN e build.
`preview` serve localmente il risultato della build. Per la pubblicazione
statica è sufficiente servire il contenuto di `dist/`.

## Configurazione

I contenuti si aggiornano in `src/config/wedding.config.ts`. Un elemento di
`locations` con entrambi gli eventi mostra un solo indirizzo e un solo link
Maps. Due elementi con un evento ciascuno mostrano due luoghi distinti.

Da ricevere o confermare dalla cliente

- Frase personalizzata per il cartoncino.
- Intestatario e IBAN confermati. Con `gifts.iban: null` compare il segnaposto. Il comando di copia appare quando è configurato un IBAN valido. La configurazione controlla la sintassi e il codice di controllo prima della build.
- Testo introduttivo per i regali e messaggio finale. I testi presenti sono bozze da approvare.

La copia automatica usa gli appunti del browser in un contesto sicuro, come
HTTPS o localhost. Se il browser la blocca, il codice rimane selezionabile.

Palette e tipografia sono definite in `src/styles/foundation.css`.

Gli effetti sonori della busta sono attivi per impostazione iniziale. Imposta
`ENABLE_ENVELOPE_SFX` a `false` in `src/config/envelope-sfx.config.ts` per
disattivare anche il caricamento delle clip. Le registrazioni e i dettagli
della licenza sono descritti in [ARCHITECTURE.md](ARCHITECTURE.md#effetti-sonori).

La variante sperimentale dissolve carta e cornice al termine dell’apertura e mantiene
il testo sopra la foto impostata in `hero.revealPhoto` dentro `wedding.config.ts`.
I WebP orizzontali derivano da `immagini/tramonto orizzontale.png`.
La foto del ricevimento si imposta in `locations[].venue.photo`.

La struttura del frontend è descritta in [ARCHITECTURE.md](ARCHITECTURE.md).
