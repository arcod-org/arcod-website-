import LegalPage from "@/components/site/LegalPage";
import { org } from "@/lib/content";
export const metadata = { title: "Privacy policy" };
export default function Page() {
  return (
    <LegalPage title="Privacy policy">
      <p>ARCOD respects your privacy. This policy explains what information we collect through arcod.in and how we use it.</p>
      <h2>What we collect</h2>
      <p>When you send us a message, we collect your name, contact details and message. When you donate, payments are processed by Razorpay; we receive your name, contact details, the amount and — if you ask for an 80G receipt — your PAN, but never your card or bank details.</p>
      <h2>How we use it</h2>
      <p>Only to reply to you, issue donation receipts, meet legal and FCRA reporting requirements, and share updates if you ask for them. We never sell or rent your information.</p>
      <h2>Your choices</h2>
      <p>To see, correct or delete your information, email {org.emails[0]}.</p>
    </LegalPage>
  );
}
