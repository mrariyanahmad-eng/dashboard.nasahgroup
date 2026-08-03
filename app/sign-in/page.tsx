import { SignInForm } from "@/components/SignInForm";
import { getSettings } from "@/lib/settings";

export default async function SignInPage() {
  const settings = await getSettings();
  return <SignInForm siteName={settings.site_name} logoUrl={settings.logo_mark_url} />;
}
