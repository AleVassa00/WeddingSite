import { useState } from "react";
import type { GiftsContent } from "@/src/domain/wedding/types";

interface GiftsSectionProps {
  readonly content: GiftsContent;
}

export function GiftsSection({ content }: GiftsSectionProps) {
  const { iban, ibanPlaceholder, beneficiary, intro } = content;
  const [copyFeedback, setCopyFeedback] = useState("");
  const displayedIban = iban?.match(/.{1,4}/g)?.join(" ") ?? ibanPlaceholder;

  async function copyIban() {
    if (!iban) {
      return;
    }

    setCopyFeedback("Copia in corso…");
    try {
      await navigator.clipboard.writeText(iban);
      setCopyFeedback("IBAN copiato.");
    } catch {
      setCopyFeedback("Copia automatica non disponibile. Seleziona l’IBAN per copiarlo manualmente.");
    }
  }

  return (
    <section className="invitation-section gifts" id="regali" aria-labelledby="gifts-title">
      <header className="invitation-section-heading">
        <span className="eyebrow">Un pensiero</span>
        <h2 id="gifts-title">Regali</h2>
        <p>{intro}</p>
      </header>

      <div className="gift-slip">
        <dl className="gift-details">
          <div>
            <dt>Intestatario</dt>
            <dd>{beneficiary ?? "Da comunicare"}</dd>
          </div>
          <div>
            <dt>IBAN</dt>
            <dd>
              {iban
                ? <code className="gift-iban">{displayedIban}</code>
                : <span className="gift-placeholder">{displayedIban}</span>}
            </dd>
          </div>
        </dl>
        <button className="text-link copy-iban" type="button" disabled={!iban} onClick={copyIban}>
          Copia IBAN
        </button>
        {iban && <p className="gift-feedback" role="status">{copyFeedback}</p>}
      </div>
    </section>
  );
}
