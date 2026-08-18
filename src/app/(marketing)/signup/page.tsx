import { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign up | TinyUR",
  description: "Create a free TinyUR account to save and manage your short links.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 pt-28">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] md:p-10">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Create an account</h1>
        <p className="mb-8 text-gray-600">
          Free forever. Save your links and come back to them anytime.
        </p>
        <AuthForm mode="signup" />
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
