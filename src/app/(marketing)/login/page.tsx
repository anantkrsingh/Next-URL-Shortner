import { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Login | TinyUR",
  description: "Log in to your TinyUR account to manage your short links.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen px-4 py-12 pt-28">
      <div className="glass-panel glass-doc mx-auto max-w-md rounded-2xl p-8 md:p-10">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Log in</h1>
        <p className="mb-8 text-gray-600">
          Welcome back. Sign in to manage your short links.
        </p>
        <AuthForm mode="login" initialError={error} />
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
