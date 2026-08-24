"use client";

import { FormEvent, useState } from "react";
import { useSendContactMessage } from "@/hooks/useContact";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const sendMessage = useSendContactMessage();
  const loading = sendMessage.isPending;
  const error =
    sendMessage.error instanceof Error ? sendMessage.error.message : "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    try {
      await sendMessage.mutateAsync({ name, email, subject, message });
      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      // error surfaced below via sendMessage.error
    }
  };

  const fieldClass =
    "w-full glass-input px-4 py-2.5 disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-gray-800">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-gray-800">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-semibold text-gray-800">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          maxLength={200}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={loading}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-gray-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          className={fieldClass}
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
      )}
      {success && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          Thanks — your message was sent. We typically reply within 1–2 business days.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="glass-btn w-fit px-6 py-2.5 font-semibold disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
