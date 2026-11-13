import Link from "next/link";
import { BUSES, ROUTES, statusLabel } from "@/lib/data";

export default function TerminalPage() {
  const atBay = BUSES.filter((b) => b.status === "at-terminal");
  const nextOut = BUSES.filter((b) => b.status === "on-route" || b.status === "at-terminal");

  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-abia-line bg-white/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-medium text-abia-muted">
            ← Home
          </Link>
          <span className="text-sm font-semibold">Terminal board</span>
          <Link href="/ops" className="text-sm font-medium text-abia">
            Ops
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-xl font-semibold">Nnenna Otti / Aba — departures</h1>
        <p className="mt-1 text-sm text-abia-muted">Demo board · who is in bay · what leaves next</p>

        <section className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-abia-muted">
            At terminal now
          </h2>
          <div className="mt-3 space-y-2">
            {atBay.length === 0 && (
              <p className="text-sm text-abia-muted">No buses marked at terminal in demo.</p>
            )}
            {atBay.map((b) => (
              <div key={b.id} className="card flex items-center justify-between p-4">
                <div>
                  <p className="font-mono text-xs text-abia-muted">{b.id}</p>
                  <p className="font-semibold">{b.route}</p>
                </div>
                <span className="text-sm font-medium text-sky-700">{statusLabel(b.status)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-abia-muted">
            Next service by route
          </h2>
          <div className="mt-3 space-y-2">
            {ROUTES.map((r) => {
              const bus = nextOut.find((b) => b.routeId === r.id);
              return (
                <div key={r.id} className="card flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs text-abia-muted">
                      {r.from} → {r.to}
                    </p>
                  </div>
                  <div className="text-right">
                    {bus ? (
                      <>
                        <p className="font-mono text-sm font-semibold text-abia">{bus.id}</p>
                        <p className="text-xs text-abia-muted">
                          {bus.etaMin != null ? `${bus.etaMin} min` : statusLabel(bus.status)}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-abia-muted">No active bus</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
