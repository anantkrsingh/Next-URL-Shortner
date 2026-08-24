"use client";

import { FormEvent, useState } from "react";
import type { AccountUser } from "./AccountView";

export default function ProfileSection({
  user,
  onUpdated,
}: {
  user: AccountUser;
  onUpdated: (next: { name: string }) => void;
}) {
  const [name, setName] = useState(user.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const memberSince = new Date(user.memberSince).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dirty = name.trim() !== user.name;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not update profile.");
      }

      onUpdated({ name: data.user.name });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white">Profile management</h2>
        <p className="mt-1 text-sm text-white/60">
          Update the name shown across your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
          <div>
            <label htmlFor="profile-name" className="mb-1 block text-sm font-semibold text-white/80">
              Full name
            </label>
            <input
              id="profile-name"
              type="text"
              required
              maxLength={120}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSuccess(false);
              }}
              disabled={loading}
              className="w-full glass-input px-4 py-2.5 disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="profile-email" className="mb-1 block text-sm font-semibold text-white/80">
              Email address
            </label>
            <input
              id="profile-email"
              type="email"
              value={user.email}
              disabled
              className="w-full glass-input px-4 py-2.5 opacity-60"
            />
            <p className="mt-1 text-xs text-white/40">
              Contact support to change the email on your account.
            </p>
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">{error}</p>
          )}
          {success && (
            <p className="rounded-lg bg-green-500/20 px-4 py-2 text-sm text-green-200">
              Profile updated.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !dirty || name.trim().length < 2}
            className="glass-btn px-6 py-2.5 font-semibold disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save changes"}
          </button>
        </form>
      </section>

      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white">Account details</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold tracking-wide text-white/40 uppercase">
              Sign-in method
            </dt>
            <dd className="mt-1 text-sm text-white/80 capitalize">
              {user.authProvider === "google" ? "Google" : "Email & password"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wide text-white/40 uppercase">
              Member since
            </dt>
            <dd className="mt-1 text-sm text-white/80">{memberSince}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
