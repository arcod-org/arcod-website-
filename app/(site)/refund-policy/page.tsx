import LegalPage from "@/components/site/LegalPage";
import { org } from "@/lib/content";
export const metadata = { title: "Donation refund policy" };
export default function Page() {
  return (
    <LegalPage title="Donation refund policy">
      <p>Donations to ARCOD are generally non-refundable, as they are put to work for our programmes quickly.</p>
      <h2>Mistakes happen</h2>
      <p>If you donated an incorrect amount or were charged twice, email {org.emails[0]} within 7 days with your payment reference. Verified errors are refunded to the original payment method within 10–15 working days.</p>
      <h2>80G receipts</h2>
      <p>If a donation is refunded, any 80G receipt issued for it is cancelled.</p>
    </LegalPage>
  );
}
