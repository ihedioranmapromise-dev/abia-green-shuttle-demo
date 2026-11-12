import Link from "next/link";
import { ROUTES } from "@/lib/data";

export default function RoutesPage() {
  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-abia-line bg-white/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-medium text-abia-muted">
            ← Home
          </Link>
          <span className="text-sm font-semibold">Routes</span>
          <span className="w-12" />
        </div>
      </header>
      <main className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        <h1 className="text-xl font-semibold">Published routes</h1>
        <p className="text-sm text-abia-muted">Demo corridor set — expand with real terminal data later.</p>
        {ROUTES.map((r) => (
          <article key={r.id} className="card p-5">
            <h2 className="text-base font-semibold">{r.name}</h2>
            <p className="mt-1 text-sm text-abia-muted">
              {r.from} → {r.to}
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-abia-muted">Stops</p>
            <p className="mt-1 text-sm">{r.stops.join(" · ")}</p>
            <p className="mt-2 text-xs text-abia">{r.fareNote}</p>
          </article>
        ))}
        <Link href="/passenger" className="btn-primary inline-flex">
          Check next bus
        </Link>
      </main>
    </div>
  );
}
