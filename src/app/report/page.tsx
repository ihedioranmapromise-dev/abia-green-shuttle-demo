"use client";

import Link from "next/link";
import { useState } from "react";
import { BUSES, DEMO_INCIDENTS, ROUTES } from "@/lib/data";

const TYPES = ["Delay", "Skipped stop", "Breakdown", "Conduct", "Cleanliness", "Accessibility", "Other"];

export default function ReportPage() {
  const [type, setType] = useState(TYPES[0]);
  const [busId, setBusId] = useState("");
  const [route, setRoute] = useState("");
  const [note, setNote] = useState("");
  const [ticket, setTicket] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const id = `INC-2026-${String(Math.floor(20 + Math.random() * 80)).padStart(3, "0")}`;
    setTicket(id);
  }

  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-abia-line bg-white/90">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-medium text-abia-muted">
            ← Home
          </Link>
          <span className="text-sm font-semibold">Report issue</span>
          <span className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        {ticket ? (
          <div className="card p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-abia">Received</p>
            <p className="mt-2 font-mono text-2xl font-semibold">{ticket}</p>
            <p className="mt-3 text-sm text-abia-muted">
              Save this ID. Status starts as received — same idea as the citizen ticket demo.
            </p>
            <Link href="/" className="btn-primary mt-6 inline-flex">
              Done
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="card space-y-4 p-5">
            <p className="text-sm text-abia-muted">
              Report a service issue. You get a reference ID (demo).
            </p>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-abia-muted">
                Type
              </label>
              <select
                className="w-full rounded-xl border border-abia-line px-3 py-2.5 text-sm"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-abia-muted">
                Bus (optional)
              </label>
              <select
                className="w-full rounded-xl border border-abia-line px-3 py-2.5 text-sm"
                value={busId}
                onChange={(e) => setBusId(e.target.value)}
              >
                <option value="">—</option>
                {BUSES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.id} · {b.route}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-abia-muted">
                Route (optional)
              </label>
              <select
                className="w-full rounded-xl border border-abia-line px-3 py-2.5 text-sm"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              >
                <option value="">—</option>
                {ROUTES.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-abia-muted">
                Note
              </label>
              <textarea
                className="w-full rounded-xl border border-abia-line px-3 py-2.5 text-sm min-h-[88px]"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Submit report
            </button>
          </form>
        )}

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-abia-muted">
            Open sample incidents
          </p>
          {DEMO_INCIDENTS.map((i) => (
            <div key={i.id} className="card mt-2 p-4 text-sm">
              <p className="font-mono text-xs text-abia-muted">{i.id}</p>
              <p className="font-semibold">
                {i.type} · {i.busId || i.route}
              </p>
              <p className="text-abia-muted">{i.note}</p>
              <p className="mt-1 text-xs font-medium text-abia">{i.status}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
