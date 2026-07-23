import { weddingConfig } from "@/src/config/wedding.config";
import { WeddingInvitationApp } from "@/src/presentation/WeddingInvitationApp";

export default function HomePage() {
  return <WeddingInvitationApp config={weddingConfig} />;
}
