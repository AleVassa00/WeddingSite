# Architettura

WeddingSite è un frontend React con TypeScript, Vite e CSS personalizzato.
Vite produce in `dist/` la pagina HTML e gli asset per un hosting statico.

| Responsabilità | Percorso |
| --- | --- |
| Avvio del frontend | `index.html` e `src/main.tsx` |
| Testi, date, link e metadati | `src/config/wedding.config.ts` |
| Tipi, validazione della configurazione e calcolo del conto alla rovescia | `src/domain/wedding/` |
| Aggiornamento del conto alla rovescia | `src/application/hooks/useCountdown.ts` |
| Composizione della pagina e sezioni | `src/presentation/views/` e `src/presentation/components/` |
| Token, tipografia e regole condivise | `src/styles/foundation.css` |
| Stili della busta, del cartoncino e delle sezioni | `src/styles/` |
| Texture e risorse statiche | `public/` |

`useInvitationOpening` misura la busta e il cartoncino e coordina i cinque
stati dell'apertura. Le animazioni CSS del cartoncino avanzano la sequenza
tramite `Animation.finished`. Durante i 3,15 secondi della sequenza il
cartoncino della hero risale tra il retro e la tasca della busta, si libera
dalla tasca e raggiunge la sua posizione nel layout. Il comando di salto,
il movimento ridotto e il recupero dopo un'interruzione portano direttamente
alla hero. Il conto alla rovescia si aggiorna nella propria sezione.

Vite usa la configurazione del matrimonio per inserire titolo e metadati
direttamente nell'HTML. I riferimenti agli asset nella build sono relativi
alla pagina, così l'invito può essere servito anche da una sottocartella.

## Identità visiva

`foundation.css` definisce `--accent` per l'ocra, `--paper` per l'avorio,
`--champagne` per i dettagli caldi e `--ink` per il testo. I token
`--accent-ink` e `--ink-muted` forniscono varianti leggibili sulle superfici
chiare. `--gutter`, `--section-space` e `--text-title` adattano le proporzioni
alla larghezza dello schermo. `--duration-feedback` e `--ease-out` regolano
il feedback dei comandi. `--opening-duration`, `--letter-duration` e
`--transition-duration` definiscono la durata delle tre fasi animate.

Cormorant Garamond è il carattere dei nomi, dei titoli e dei monogrammi.
EB Garamond è destinato alla lettura, Manrope ai comandi e alle etichette.
La busta e il cartoncino condividono la grana di carta cotone. Il sigillo
usa una texture trasparente, con le iniziali sovrapposte dal componente React.

### Risorse dei materiali

[Carta cotone](public/textures/cotton-paper.webp) e
[ceralacca champagne](public/textures/champagne-wax-seal.webp) sono state
generate con ImageGen a partire dai due riferimenti e ottimizzate in WebP.

<details>
<summary>Prompt ImageGen</summary>

**Carta.** Use case: product-mockup. Material asset for a wedding invitation website. Both supplied images are references solely for the realistic densely felted cotton-paper grain. Create a square seamless edge-to-edge flat-lay macro photograph of a sheet of pale warm neutral ivory handmade cotton rag paper, with visible fine short irregular fibers and gently pressed, uneven tooth. The sheet fills the entire image. Subtle neutral even lighting so the asset can be colored and lit in CSS. Matte, tactile, delicate and premium, no stains, wrinkles, blotches, large flecks, gradients, vignette, lettering, edges, cuts, folds, borders, shadows, seal, or any other object. Low contrast uniform sample, suitable as a repeating background texture.

**Sigillo.** Use case: product-mockup. Create a photorealistic isolated alpha cutout for a live wedding website. Both supplied screenshots are references for the hand-poured ivory wax seal material only. Photograph directly overhead one blank champagne-ivory circular hand-poured wax seal with a very subtly irregular thick outer lip and a smooth slightly recessed inner stamp face, like the ivory seal in the reference. The material is real warm creamy sealing wax with translucent edges and subtle pearlescent highlights, not metal. Soft directional light from the upper left, realistic self-shadow and warm reflected light. The single wax disk fills 88% of the square. Transparent background everywhere outside the disk, no cast shadow outside the object. Blank clean center for an HTML monogram overlay. No letters, no emblem, no gold, no extra objects, no border outside the wax.

</details>
