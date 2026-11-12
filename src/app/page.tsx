import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-abia-line bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-abia text-sm font-bold text-white">
              AG
            </span>
            <div>
              <p className="text-sm font-semibold">Abia Green Shuttle</p>
              <p className="text-[10px] text-abia-muted">Interactive demo · not the live state system</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/passenger" className="btn-secondary text-xs sm:text-sm">
              Passenger
            </Link>
            <Link href="/ops" className="btn-primary text-xs sm:text-sm">
              Ops desk
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-abia">
          Prototype · walkable demo
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          See the fleet. See the next bus. See what we can build for Green Shuttle.
        </h1>
        <p className="mt-4 max-w-xl text-base text-abia-muted sm:text-lg">
          This is not a slideshow. Click through a passenger view and an operations desk —
          routes, ETAs, bus status — the kind of thin visibility layer that makes an electric
          fleet usable for people and manageable for transport ops.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/passenger" className="btn-primary px-5 py-3">
            Open passenger view
          </Link>
          <Link href="/ops" className="btn-secondary px-5 py-3">
            Open ops desk
          </Link>
          <Link href="/routes" className="btn-secondary px-5 py-3">
            Routes
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Passenger",
              d: "Pick a route, see next bus ETA and stops — phone-first.",
            },
            {
              t: "Ops desk",
              d: "Fleet board: on route, at terminal, charging, maintenance.",
            },
            {
              t: "Proof of build",
              d: "Same bar as citizen ticket — real UI, not slides.",
            },
          ].map((x) => (
            <div key={x.t} className="card p-5">
              <h2 className="text-sm font-semibold">{x.t}</h2>
              <p className="mt-2 text-sm text-abia-muted">{x.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-abia-muted">
          Demo data only. Aligned with Abia Green Shuttle electric fleet direction (terminals,
          intra/inter-city routes, subsidised service).
        </p>
      </main>
    </div>
  );
}
