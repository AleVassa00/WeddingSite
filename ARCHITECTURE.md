# Architettura

WeddingSite è un frontend React con TypeScript, Vite e CSS personalizzato.
Vite produce in `dist/` la pagina HTML e gli asset per un hosting statico.

| Responsabilità | Percorso |
| --- | --- |
| Avvio del frontend | `index.html` e `src/main.tsx` |
| Testi, date, luoghi, coordinate bancarie e metadati | `src/config/wedding.config.ts` |
| Tipi, validazione della configurazione e normalizzazione dell’IBAN | `src/domain/wedding/` |
| Composizione della pagina e sezioni | `src/presentation/views/` e `src/presentation/components/` |
| Token, tipografia e regole condivise | `src/styles/foundation.css` |
| Stili della busta, del cartoncino e delle sezioni | `src/styles/` |
| Texture e risorse statiche | `public/` |

`useInvitationOpening` misura la busta e il cartoncino e coordina i cinque
stati dell'apertura. Due marcatori leggono il tempo dell'animazione CSS
in corso. `Animation.finished` porta alla hero. Durante i 3,65 secondi
della sequenza il cartoncino risale tra il retro e la tasca della busta
e comincia a ingrandirsi prima di raggiungere il punto più alto.
Il comando di salto,
il movimento ridotto e il recupero dopo un'interruzione portano direttamente
alla hero. La partecipazione prosegue con luoghi e orari, regali e saluti.

Vite usa la configurazione del matrimonio per inserire titolo e metadati
direttamente nell'HTML. I riferimenti agli asset nella build sono relativi
alla pagina, così l'invito può essere servito anche da una sottocartella.

## Identità visiva

`foundation.css` definisce `--accent` per l'ocra, `--paper` per l'avorio,
`--champagne` per i dettagli caldi e `--ink` per il testo. I token
`--accent-ink` e `--ink-muted` forniscono varianti leggibili sulle superfici
chiare. `--gutter`, `--section-space` e `--text-title` adattano le proporzioni
alla larghezza dello schermo. `--duration-feedback` e `--ease-out` regolano
il feedback dei comandi. `--opening-duration` definisce la durata della
sequenza del cartoncino. Le facce della patta usano livelli separati e
ombre statiche, mentre il movimento usa trasformazioni e opacità.

Cormorant Garamond è il carattere dei nomi, dei titoli e dei monogrammi.
EB Garamond è destinato alla lettura, Manrope ai comandi e alle etichette.
La busta usa una grana di carta cotone ripresa da ritagli diversi della
stessa texture. Il cartoncino usa la trama avorio. Il sigillo usa una
texture trasparente con le iniziali sovrapposte dal componente React.

### Risorse dei materiali

[Carta cotone](public/textures/cotton-paper.webp) e
[ceralacca champagne](public/textures/champagne-wax-seal.webp) sono state
generate con ImageGen a partire dai due riferimenti e ottimizzate in WebP.

La Fase 3.1 aggiunge [cotone con luce radente](public/textures/envelope-cotton.webp)
e [ceralacca satinata](public/textures/champagne-wax-seal-satin.webp).
ImageGen ha elaborato gli asset esistenti usando un fotogramma del video come
riferimento per materiali e illuminazione. L'ombra di contatto segue la forma
del bordo, mentre le pieghe hanno ombre e riflessi locali.

<details>
<summary>Prompt ImageGen</summary>

**Carta.** Use case: product-mockup. Material asset for a wedding invitation website. Both supplied images are references solely for the realistic densely felted cotton-paper grain. Create a square seamless edge-to-edge flat-lay macro photograph of a sheet of pale warm neutral ivory handmade cotton rag paper, with visible fine short irregular fibers and gently pressed, uneven tooth. The sheet fills the entire image. Subtle neutral even lighting so the asset can be colored and lit in CSS. Matte, tactile, delicate and premium, no stains, wrinkles, blotches, large flecks, gradients, vignette, lettering, edges, cuts, folds, borders, shadows, seal, or any other object. Low contrast uniform sample, suitable as a repeating background texture.

**Sigillo.** Use case: product-mockup. Create a photorealistic isolated alpha cutout for a live wedding website. Both supplied screenshots are references for the hand-poured ivory wax seal material only. Photograph directly overhead one blank champagne-ivory circular hand-poured wax seal with a very subtly irregular thick outer lip and a smooth slightly recessed inner stamp face, like the ivory seal in the reference. The material is real warm creamy sealing wax with translucent edges and subtle pearlescent highlights, not metal. Soft directional light from the upper left, realistic self-shadow and warm reflected light. The single wax disk fills 88% of the square. Transparent background everywhere outside the disk, no cast shadow outside the object. Blank clean center for an HTML monogram overlay. No letters, no emblem, no gold, no extra objects, no border outside the wax.

**Carta, Fase 3.1.** Use case: precise-object-edit. First image is the edit target, the existing cotton paper material swatch. Second image is the style reference solely for the grain and fine surface relief in the photographed paper; disregard its color and all objects or graphics. Refine the swatch into an edge-to-edge square macro material photograph of matte, tightly felted, handmade cotton rag envelope paper, neutral pearl/ivory with subtle multiscale fibers and small uneven pressed depressions, visibly tactile in soft raking window light from the upper left. Fine irregular overlapping fibers with random orientations and soft self-shadows, tiny localized variation rather than a flat noise pattern. Keep the overall lightness uniform so the material can be tinted ochre in CSS; moderately defined microcontrast but no large gradients, banding, repeating pattern, cracks, folds, flecks, cut edges, text, seals or objects. The whole frame is one sheet, perpendicular camera, editorial macro photography.

**Sigillo, Fase 3.1.** Use case: precise-object-edit. First image is the edit target: isolated blank ivory-champagne hand-poured sealing wax stamp. Second image is a material and lighting reference for the wax only; ignore its monogram, green paper, and graphics. Keep one near-circular blank wax seal, seen from directly overhead, centered, diameter about 92% of square frame. Maintain transparent alpha outside the entire seal. Refine the wax from a glossy and fairly regular disk into premium authentic pale champagne wax with subtly uneven hand-poured perimeter, a slightly irregular rolled rim and compressed shallow blank central face. Make the surface finely satin, with a broad soft upper-left window highlight that breaks subtly along the rim, believable warmer shadows below-right and tiny natural casting imperfections. Delicate translucent wax at the edge, quiet warm neutral color. No dark outer cast shadow; it will be added in the website. Absolutely no monogram, no lettering, no decoration, no background or extraneous pixels outside the wax. Keep the blank face large enough for live letterforms.

</details>
