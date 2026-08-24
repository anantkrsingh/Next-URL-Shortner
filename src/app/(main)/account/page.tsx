import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AccountView from "@/components/account/AccountView";

export const metadata: Metadata = {
  title: "Your Account | TinyUR",
  description:
    "Manage your TinyUR profile, security, account usage, branded domains, subscription, and invoices.",
};

export default async function AccountPage() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      name: true,
      email: true,
      googleId: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen px-4 pt-28 pb-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <AccountView
          user={{
            id: user.id,
            name: user.name,
            email: user.email,
            authProvider: user.googleId ? "google" : "password",
            memberSince: user.createdAt.toISOString(),
          }}
        />
      </div>
    </div>
  );
}
