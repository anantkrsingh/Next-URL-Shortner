"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { AccountUser } from "./AccountView";

export default function SecuritySection({ user }: { user: AccountUser }) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not update password.");
      }

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update password.");
    } finally {
      setLoading(false);
    }
  };

  const logoutHere = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white">Password</h2>

        {user.authProvider === "google" ? (
          <p className="mt-3 max-w-md text-sm text-white/60">
            Your account signs in with Google, so there&apos;s no separate TinyUR
            password to manage. Manage sign-in security from your Google account.
          </p>
        ) : (
          <>
            <p className="mt-1 text-sm text-white/60">
              Choose a strong password you don&apos;t use anywhere else.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
              <div>
                <label htmlFor="current-password" className="mb-1 block text-sm font-semibold text-white/80">
                  Current password
                </label>
                <input
                  id="current-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={loading}
                  className="w-full glass-input px-4 py-2.5 disabled:opacity-60"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="mb-1 block text-sm font-semibold text-white/80">
                  New password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  className="w-full glass-input px-4 py-2.5 disabled:opacity-60"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="mb-1 block text-sm font-semibold text-white/80">
                  Confirm new password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="w-full glass-input px-4 py-2.5 disabled:opacity-60"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">{error}</p>
              )}
              {success && (
                <p className="rounded-lg bg-green-500/20 px-4 py-2 text-sm text-green-200">
                  Password updated.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="glass-btn px-6 py-2.5 font-semibold disabled:opacity-50"
              >
                {loading ? "Updating…" : "Update password"}
              </button>
            </form>
          </>
        )}
      </section>

      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white">Sessions</h2>
        <p className="mt-1 text-sm text-white/60">
          You&apos;re currently signed in on this device.
        </p>
        <button
          type="button"
          onClick={logoutHere}
          disabled={loggingOut}
          className="glass-input mt-4 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
        >
          {loggingOut ? "Logging out…" : "Log out of this device"}
        </button>
      </section>
    </div>
  );
}
