# WeddingSite — Veronica & Maurizio

Partecipazione digitale. Data, luogo, programma, storia e indicazioni per gli
ospiti sono contenuti provvisori.

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

`validate` esegue typecheck, lint, test del conto alla rovescia e build.
`preview` serve localmente il risultato della build. Per la pubblicazione
statica è sufficiente servire il contenuto di `dist/`.

## Configurazione

La configurazione centralizzata in `src/config/wedding.config.ts` contiene
nomi, date, testi, navigazione, programma, luogo e metadati. Palette e
tipografia sono definite in `src/styles/foundation.css`.

La struttura del frontend è descritta in [ARCHITECTURE.md](ARCHITECTURE.md).
