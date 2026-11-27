import LegalPage from "@/components/site/LegalPage";
export const metadata = { title: "Terms of use" };
export default function Page() {
  return (
    <LegalPage title="Terms of use">
      <p>By using arcod.in you agree to these terms. The content on this site is provided for information about ARCOD’s work.</p>
      <h2>Content</h2>
      <p>Photos, text and reports on this site belong to ARCOD unless stated otherwise. Please ask before reusing them.</p>
      <h2>Donations</h2>
      <p>Donations are voluntary contributions to ARCOD, a registered non-profit, and are used for its charitable objectives. Foreign contributions are accepted only as permitted under FCRA.</p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time; the latest version will always be on this page.</p>
    </LegalPage>
  );
}
