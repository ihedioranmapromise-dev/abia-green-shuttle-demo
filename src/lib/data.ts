export type BusStatus = "on-route" | "at-terminal" | "charging" | "maintenance";

export type Bus = {
  id: string;
  plate: string;
  routeId: string;
  route: string;
  status: BusStatus;
  etaMin?: number;
  nextStop?: string;
  stopIndex: number;
  load?: number;
  lastUpdated: string;
};

export type Route = {
  id: string;
  name: string;
  from: string;
  to: string;
  stops: string[];
  fullFare: number;
  subsidisedFare: number;
};

export type Incident = {
  id: string;
  type: string;
  busId?: string;
  route?: string;
  note: string;
  status: "received" | "looking into it" | "closed";
};

export const ROUTES: Route[] = [
  {
    id: "r1",
    name: "Umuahia Central",
    from: "Nnenna Otti Terminal",
    to: "Umuahia Main Market",
    stops: ["Nnenna Otti Terminal", "Government House axis", "Umuahia Main Market"],
    fullFare: 400,
    subsidisedFare: 200,
  },
  {
    id: "r2",
    name: "Aba Corridor",
    from: "Aba Terminal",
    to: "Ariaria axis",
    stops: ["Aba Terminal", "Aba-Owerri Rd shelter", "Ariaria axis"],
    fullFare: 400,
    subsidisedFare: 200,
  },
  {
    id: "r3",
    name: "Inter-city link",
    from: "Umuahia",
    to: "Aba",
    stops: ["Nnenna Otti Terminal", "Express stop", "Aba Terminal"],
    fullFare: 1200,
    subsidisedFare: 600,
  },
];

export const BUSES: Bus[] = [
  {
    id: "AGS-01",
    plate: "ABIA-EV-01",
    routeId: "r1",
    route: "Umuahia Central",
    status: "on-route",
    etaMin: 4,
    nextStop: "Government House axis",
    stopIndex: 1,
    load: 62,
    lastUpdated: "30 sec ago",
  },
  {
    id: "AGS-02",
    plate: "ABIA-EV-02",
    routeId: "r1",
    route: "Umuahia Central",
    status: "at-terminal",
    nextStop: "Nnenna Otti Terminal",
    stopIndex: 0,
    load: 0,
    lastUpdated: "1 min ago",
  },
  {
    id: "AGS-07",
    plate: "ABIA-EV-07",
    routeId: "r2",
    route: "Aba Corridor",
    status: "on-route",
    etaMin: 11,
    nextStop: "Aba-Owerri Rd shelter",
    stopIndex: 1,
    load: 48,
    lastUpdated: "45 sec ago",
  },
  {
    id: "AGS-12",
    plate: "ABIA-EV-12",
    routeId: "r3",
    route: "Inter-city link",
    status: "on-route",
    etaMin: 28,
    nextStop: "Express stop",
    stopIndex: 1,
    load: 71,
    lastUpdated: "1 min ago",
  },
  {
    id: "AGS-03",
    plate: "ABIA-EV-03",
    routeId: "r2",
    route: "Aba Corridor",
    status: "charging",
    stopIndex: 0,
    load: 0,
    lastUpdated: "5 min ago",
  },
  {
    id: "AGS-09",
    plate: "ABIA-EV-09",
    routeId: "r1",
    route: "Umuahia Central",
    status: "maintenance",
    stopIndex: 0,
    load: 0,
    lastUpdated: "12 min ago",
  },
];

export const DEMO_INCIDENTS: Incident[] = [
  {
    id: "INC-2026-014",
    type: "Delay",
    busId: "AGS-07",
    route: "Aba Corridor",
    note: "Heavy traffic near Owerri Rd shelter",
    status: "looking into it",
  },
];

export function statusLabel(s: BusStatus) {
  switch (s) {
    case "on-route":
      return "On route";
    case "at-terminal":
      return "At terminal";
    case "charging":
      return "Charging";
    case "maintenance":
      return "Maintenance";
  }
}

export function statusColor(s: BusStatus) {
  switch (s) {
    case "on-route":
      return "bg-emerald-100 text-emerald-800";
    case "at-terminal":
      return "bg-sky-100 text-sky-800";
    case "charging":
      return "bg-amber-100 text-amber-800";
    case "maintenance":
      return "bg-slate-100 text-slate-600";
  }
}

export function formatNaira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}

export function findBus(id: string) {
  return BUSES.find((b) => b.id === id);
}

export function findRoute(id: string) {
  return ROUTES.find((r) => r.id === id);
}
