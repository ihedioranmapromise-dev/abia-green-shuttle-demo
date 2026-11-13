"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ROUTES, formatNaira, findRoute } from "@/lib/data";

function WalletInner() {
  const params = useSearchParams();
  const payRoute = params.get("pay");
  const [balance, setBalance] = useState(1500);
  const [history, setHistory] = useState<
    { id: string; label: string; amount: number; at: string }[]
  >([
    { id: "t1", label: "Top-up", amount: 2000, at: "Yesterday" },
    { id: "t2", label: "Umuahia Central trip", amount: -200, at: "Yesterday" },
  ]);
  const [msg, setMsg] = useState("");

  const route = payRoute ? findRoute(payRoute) : null;

  function topUp(amount: number) {
    setBalance((b) => b + amount);
    setHistory((h) => [
      { id: `t-${Date.now()}`, label: "Top-up", amount, at: "Just now" },
      ...h,
    ]);
    setMsg(`Top-up ${formatNaira(amount)} added (demo).`);
  }

  function payTrip() {
    if (!route) return;
    const fare = route.subsidisedFare;
    if (balance < fare) {
      setMsg("Balance too low — top up first.");
      return;
    }
    setBalance((b) => b - fare);
    setHistory((h) => [
      {
        id: `t-${Date.now()}`,
        label: `${route.name} trip`,
        amount: -fare,
        at: "Just now",
      },
      ...h,
    ]);
    setMsg(`Paid ${formatNaira(fare)} (subsidised). Ticket OK for boarding (demo).`);
  }

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-10 border-b border-abia-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-medium text-abia-muted">
            ← Home
          </Link>
          <span className="text-sm font-semibold">Wallet</span>
          <Link href="/passenger" className="text-sm font-medium text-abia">
            Ride
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 px-4 py-6">
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-br from-abia to-abia-dark px-5 py-6 text-white">
            <p className="text-xs font-medium text-white/70">Abia Connect · demo balance</p>
            <p className="mt-2 text-3xl font-semibold">{formatNaira(balance)}</p>
            <p className="mt-1 text-xs text-white/60">Subsidised fares apply on Green Shuttle</p>
          </div>
          <div className="flex gap-2 p-4">
            {[500, 1000, 2000].map((a) => (
              <button
                key={a}
                type="button"
                className="btn-secondary flex-1 text-xs"
                onClick={() => topUp(a)}
              >
                +{formatNaira(a)}
              </button>
            ))}
          </div>
        </div>

        {route && (
          <div className="card border-abia/30 p-4">
            <p className="text-sm font-semibold">Pay this trip</p>
            <p className="mt-1 text-sm text-abia-muted">
              {route.name} · you pay {formatNaira(route.subsidisedFare)}{" "}
              <span className="line-through opacity-60">{formatNaira(route.fullFare)}</span>
            </p>
            <button type="button" className="btn-primary mt-3 w-full" onClick={payTrip}>
              Validate / pay
            </button>
          </div>
        )}

        {msg && (
          <p className="rounded-xl bg-abia-soft px-3 py-2 text-sm text-abia" role="status">
            {msg}
          </p>
        )}

        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-abia-muted">History</p>
          <ul className="mt-3 divide-y divide-abia-line">
            {history.map((h) => (
              <li key={h.id} className="flex justify-between py-2.5 text-sm">
                <div>
                  <p className="font-medium">{h.label}</p>
                  <p className="text-xs text-abia-muted">{h.at}</p>
                </div>
                <p className={h.amount >= 0 ? "text-abia font-semibold" : "font-semibold"}>
                  {h.amount >= 0 ? "+" : ""}
                  {formatNaira(h.amount)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-xs text-abia-muted">
          Demo wallet only. Production would use real top-up rails and Connect Card rules.
        </p>
      </main>
    </div>
  );
}

export default function WalletPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-abia-muted">Loading wallet…</div>}>
      <WalletInner />
    </Suspense>
  );
}
