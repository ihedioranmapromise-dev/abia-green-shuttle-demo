import Link from "next/link";
import { findBus, findRoute, statusColor, statusLabel } from "@/lib/data";

export default function TrackPage({ params }: { params: { id: string } }) {
  const bus = findBus(params.id);

  if (!bus) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-sm text-abia-muted">Bus not found.</p>
        <Link href="/passenger" className="btn-secondary mt-4 inline-flex">
          Passenger
        </Link>
      </div>
    );
  }

  const route = findRoute(bus.routeId);
  const stops = route?.stops || [];

  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-abia-line bg-white/90">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <Link href="/passenger" className="text-sm font-medium text-abia-muted">
            ← Passenger
          </Link>
          <span className="text-sm font-semibold">Live track</span>
          <Link href="/ops" className="text-sm font-medium text-abia">
            Ops
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <div className="card overflow-hidden">
          <div className="bg-[#0f1419] px-5 py-6 text-white">
            <p className="font-mono text-xs text-white/50">{bus.plate}</p>
            <h1 className="mt-1 text-2xl font-semibold">{bus.id}</h1>
            <p className="mt-1 text-sm text-white/70">{bus.route}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor(bus.status)}`}>
                {statusLabel(bus.status)}
              </span>
              <span className="text-xs text-white/50">Updated {bus.lastUpdated}</span>
            </div>
            {bus.etaMin != null && bus.status === "on-route" && (
              <p className="mt-4 text-3xl font-semibold text-emerald-300">
                {bus.etaMin} <span className="text-base font-medium text-white/70">min to next stop</span>
              </p>
            )}
          </div>

          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-abia-muted">
              Position on route
            </p>
            <ol className="relative mt-4 ml-2 border-l-2 border-abia-line">
              {stops.map((stop, i) => {
                const passed = i < bus.stopIndex;
                const here = i === bus.stopIndex;
                return (
                  <li key={stop} className="relative pb-6 pl-6 last:pb-0">
                    <span
                      className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 ${
                        here
                          ? "border-abia bg-abia shadow-[0_0_0_4px_rgba(11,107,58,0.2)]"
                          : passed
                            ? "border-abia bg-abia"
                            : "border-abia-line bg-white"
                      }`}
                    />
                    <p
                      className={`text-sm font-semibold ${
                        here ? "text-abia" : passed ? "text-abia-ink" : "text-abia-muted"
                      }`}
                    >
                      {stop}
                      {here && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-abia">
                          Bus here
                        </span>
                      )}
                    </p>
                  </li>
                );
              })}
            </ol>
            {bus.load != null && bus.status === "on-route" && (
              <p className="mt-2 text-sm text-abia-muted">Load ≈ {bus.load}%</p>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-abia-muted">
          Demo simulation — real system would use GPS on the vehicle.
        </p>
      </main>
    </div>
  );
}
