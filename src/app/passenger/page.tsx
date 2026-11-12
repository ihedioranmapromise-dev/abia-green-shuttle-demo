"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BUSES, ROUTES } from "@/lib/data";

export default function PassengerPage() {
  const [routeId, setRouteId] = useState(ROUTES[0].id);
  const route = ROUTES.find((r) => r.id === routeId)!;

  const nextBuses = useMemo(
    () =>
      BUSES.filter(
        (b) => b.route === route.name && (b.status === "on-route" || b.status === "at-terminal")
      ).sort((a, b) => (a.etaMin ?? 99) - (b.etaMin ?? 99)),
    [route.name]
  );

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-10 border-b border-abia-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-medium text-abia-muted">
            ← Home
          </Link>
          <span className="text-sm font-semibold">Passenger</span>
          <Link href="/ops" className="text-sm font-medium text-abia">
            Ops
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <h1 className="text-xl font-semibold tracking-tight">When is my bus?</h1>
        <p className="mt-1 text-sm text-abia-muted">Green Shuttle · live demo times</p>

        <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-abia-muted">
          Route
        </label>
        <select
          className="mt-1.5 w-full rounded-xl border border-abia-line bg-white px-3.5 py-3 text-sm outline-none focus:border-abia focus:ring-2 focus:ring-abia/15"
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
        >
          {ROUTES.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} · {r.from} → {r.to}
            </option>
          ))}
        </select>

        <div className="card mt-5 overflow-hidden">
          <div className="bg-abia px-4 py-3 text-white">
            <p className="text-xs font-medium text-white/70">Next departures</p>
            <p className="text-lg font-semibold">{route.name}</p>
          </div>
          <ul className="divide-y divide-abia-line">
            {nextBuses.length === 0 && (
              <li className="px-4 py-6 text-sm text-abia-muted">No active buses on this route in demo data.</li>
            )}
            {nextBuses.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3 px-4 py-4">
                <div>
                  <p className="font-mono text-xs text-abia-muted">{b.id}</p>
                  <p className="text-sm font-semibold">{b.nextStop}</p>
                  <p className="text-xs text-abia-muted">{b.plate}</p>
                </div>
                <div className="text-right">
                  {b.status === "at-terminal" ? (
                    <p className="text-sm font-semibold text-sky-700">At terminal</p>
                  ) : (
                    <p className="text-2xl font-semibold text-abia">{b.etaMin}<span className="text-sm font-medium"> min</span></p>
                  )}
                  {b.load != null && b.status === "on-route" && (
                    <p className="text-xs text-abia-muted">{b.load}% full</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card mt-4 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-abia-muted">Stops</p>
          <ol className="mt-3 space-y-2">
            {route.stops.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-abia-soft text-xs font-bold text-abia">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-abia-muted">{route.fareNote}</p>
        </div>
      </main>
    </div>
  );
}
