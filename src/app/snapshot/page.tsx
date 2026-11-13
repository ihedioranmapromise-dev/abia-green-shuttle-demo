import Link from "next/link";
import { BUSES, DEMO_INCIDENTS } from "@/lib/data";

export default function SnapshotPage() {
  const onRoute = BUSES.filter((b) => b.status === "on-route").length;
  const terminal = BUSES.filter((b) => b.status === "at-terminal").length;
  const charging = BUSES.filter((b) => b.status === "charging").length;
  const maint = BUSES.filter((b) => b.status === "maintenance").length;
  const openInc = DEMO_INCIDENTS.filter((i) => i.status !== "closed").length;

  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-abia-line bg-white/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-medium text-abia-muted">
            ← Home
          </Link>
          <span className="text-sm font-semibold">Day snapshot</span>
          <span className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-xl font-semibold">Green Shuttle · today</h1>
        <p className="mt-1 text-sm text-abia-muted">Leadership strip · demo numbers</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["On route", onRoute],
            ["At terminal", terminal],
            ["Charging", charging],
            ["Maintenance", maint],
          ].map(([label, n]) => (
            <div key={String(label)} className="card p-4">
              <p className="text-2xl font-semibold text-abia">{n}</p>
              <p className="text-xs text-abia-muted">{label}</p>
            </div>
          ))}
        </div>

        <div className="card mt-4 p-5">
          <p className="text-sm font-semibold">Open incidents</p>
          <p className="mt-1 text-3xl font-semibold text-abia">{openInc}</p>
          <p className="text-xs text-abia-muted">From passenger / ops reports</p>
        </div>

        <p className="mt-6 text-sm text-abia-muted">
          Real system would add ridership and on-time metrics from validators and GPS.
        </p>
      </main>
    </div>
  );
}
