import Link from "next/link";
import { ROUTES, formatNaira } from "@/lib/data";

export default function RoutesPage() {
  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-abia-line bg-white/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-medium text-abia-muted">
            ← Home
          </Link>
          <span className="text-sm font-semibold">Routes</span>
          <Link href="/passenger" className="text-sm font-medium text-abia">
            Ride
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        <h1 className="text-xl font-semibold">Published routes</h1>
        {ROUTES.map((r) => (
          <article key={r.id} className="card p-5">
            <h2 className="text-base font-semibold">{r.name}</h2>
            <p className="mt-1 text-sm text-abia-muted">
              {r.from} → {r.to}
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-abia-muted">Stops</p>
            <p className="mt-1 text-sm">{r.stops.join(" · ")}</p>
            <p className="mt-2 text-sm text-abia">
              You pay {formatNaira(r.subsidisedFare)}{" "}
              <span className="text-abia-muted line-through">{formatNaira(r.fullFare)}</span>
            </p>
          </article>
        ))}
      </main>
    </div>
  );
}
