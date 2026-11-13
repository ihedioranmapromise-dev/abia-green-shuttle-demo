import Link from "next/link";

const links = [
  { href: "/passenger", t: "Passenger", d: "Next bus, ETA, track, pay trip" },
  { href: "/ops", t: "Ops desk", d: "Fleet board, status, thin routes" },
  { href: "/terminal", t: "Terminal board", d: "At bay · next departure" },
  { href: "/wallet", t: "Wallet & top-up", d: "Balance, subsidy, trip history" },
  { href: "/report", t: "Report issue", d: "Incident → ticket ID" },
  { href: "/snapshot", t: "Day snapshot", d: "Leadership view" },
];

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
              <p className="text-[10px] text-abia-muted">Interactive demo · sample data</p>
            </div>
          </div>
          <Link href="/passenger" className="btn-primary text-xs sm:text-sm">
            Open passenger
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-abia">
          Prototype · full service layer
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Ride info, live fleet, wallet, terminal, and incidents — one demo.
        </h1>
        <p className="mt-4 max-w-xl text-base text-abia-muted sm:text-lg">
          Not a slideshow. Walk passenger ETAs, track a bus on its corridor, top up a demo
          wallet, run the ops desk, and file an incident. Proof of what we can build for the
          electric Green Shuttle programme.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((x) => (
            <Link
              key={x.href}
              href={x.href}
              className="card block p-5 transition hover:shadow-md hover:border-abia/30"
            >
              <h2 className="text-sm font-semibold text-abia-ink">{x.t}</h2>
              <p className="mt-1 text-sm text-abia-muted">{x.d}</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-sm text-abia-muted">
          Aligns with Green Shuttle direction: EV fleet, terminals, subsidised fares, e-ticketing
          / Connect Card style access. Demo only — not the live state system.
        </p>
      </main>
    </div>
  );
}
