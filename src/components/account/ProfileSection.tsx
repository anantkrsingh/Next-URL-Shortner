"use client";

import { FormEvent, useState } from "react";
import { useUpdateProfile } from "@/hooks/useAccount";
import type { AccountUser } from "./AccountView";

export default function ProfileSection({ user }: { user: AccountUser }) {
  const [name, setName] = useState(user.name);
  const [success, setSuccess] = useState(false);
  const updateProfile = useUpdateProfile();

  // Fixed locale so the server-rendered string always matches what the
  // client renders on hydration, regardless of the visitor's OS/browser
  // locale (an `undefined` locale here caused a hydration mismatch).
  const memberSince = new Date(user.memberSince).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dirty = name.trim() !== user.name;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await updateProfile.mutateAsync({ name });
      setSuccess(true);
    } catch {
      // error is surfaced below via updateProfile.error
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
              disabled={updateProfile.isPending}
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

          {updateProfile.isError && (
            <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">
              {updateProfile.error instanceof Error
                ? updateProfile.error.message
                : "Could not update profile."}
            </p>
          )}
          {success && (
            <p className="rounded-lg bg-green-500/20 px-4 py-2 text-sm text-green-200">
              Profile updated.
            </p>
          )}

          <button
            type="submit"
            disabled={updateProfile.isPending || !dirty || name.trim().length < 2}
            className="glass-btn px-6 py-2.5 font-semibold disabled:opacity-50"
          >
            {updateProfile.isPending ? "Saving…" : "Save changes"}
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
