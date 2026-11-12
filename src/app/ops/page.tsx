"use client";

import Link from "next/link";
import { useState } from "react";
import { BUSES, statusColor, statusLabel, type Bus, type BusStatus } from "@/lib/data";

export default function OpsPage() {
  const [buses, setBuses] = useState<Bus[]>(BUSES);
  const [filter, setFilter] = useState<BusStatus | "all">("all");

  const list = filter === "all" ? buses : buses.filter((b) => b.status === filter);

  const counts = {
    "on-route": buses.filter((b) => b.status === "on-route").length,
    "at-terminal": buses.filter((b) => b.status === "at-terminal").length,
    charging: buses.filter((b) => b.status === "charging").length,
    maintenance: buses.filter((b) => b.status === "maintenance").length,
  };

  function setStatus(id: string, status: BusStatus) {
    setBuses((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-10 border-b border-abia-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-medium text-abia-muted">
            ← Home
          </Link>
          <span className="text-sm font-semibold">Ops desk</span>
          <Link href="/passenger" className="text-sm font-medium text-abia">
            Passenger
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-xl font-semibold tracking-tight">Fleet board</h1>
        <p className="mt-1 text-sm text-abia-muted">Demo · change status to simulate the desk</p>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {([
            ["on-route", "On route"],
            ["at-terminal", "Terminal"],
            ["charging", "Charging"],
            ["maintenance", "Maint."],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(filter === key ? "all" : key)}
              className={`card px-3 py-3 text-left transition ${
                filter === key ? "ring-2 ring-abia" : ""
              }`}
            >
              <p className="text-2xl font-semibold text-abia">{counts[key]}</p>
              <p className="text-xs text-abia-muted">{label}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {list.map((b) => (
            <article key={b.id} className="card p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-xs text-abia-muted">
                    {b.id} · {b.plate}
                  </p>
                  <h2 className="text-base font-semibold">{b.route}</h2>
                  {b.nextStop && (
                    <p className="mt-0.5 text-sm text-abia-muted">Next: {b.nextStop}</p>
                  )}
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor(b.status)}`}>
                  {statusLabel(b.status)}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["on-route", "at-terminal", "charging", "maintenance"] as BusStatus[]).map(
                  (s) => (
                    <button
                      key={s}
                      type="button"
                      className="btn-secondary text-xs py-1.5"
                      onClick={() => setStatus(b.id, s)}
                    >
                      {statusLabel(s)}
                    </button>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
