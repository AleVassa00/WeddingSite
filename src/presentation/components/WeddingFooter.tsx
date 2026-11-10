import type { Couple } from "@/src/domain/wedding/types";
import { Monogram } from "./Monogram";

interface WeddingFooterProps {
  readonly couple: Couple;
  readonly message: string;
}

export function WeddingFooter({ couple, message }: WeddingFooterProps) {
  return (
    <footer className="wedding-footer" id="saluti">
      <p>{message}</p>
      <Monogram couple={couple} />
    </footer>
  );
}
