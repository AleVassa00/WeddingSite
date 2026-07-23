import type {
  Couple,
  FooterContent,
} from "@/src/domain/wedding/types";
import { Monogram } from "./Monogram";

interface WeddingFooterProps {
  readonly couple: Couple;
  readonly content: FooterContent;
}

export function WeddingFooter({ couple, content }: WeddingFooterProps) {
  return (
    <footer>
      <Monogram couple={couple} className="footer-mark" />
      <p>{content.text}</p>
      <a href="#inizio">{content.backToTopLabel} ↑</a>
    </footer>
  );
}
