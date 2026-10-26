import { AccountSection } from "@/components/account/AccountView";

export default async function AccountSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return <AccountSection section={section} />;
}
