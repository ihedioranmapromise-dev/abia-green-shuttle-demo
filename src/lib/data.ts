export type BusStatus = "on-route" | "at-terminal" | "charging" | "maintenance";

export type Bus = {
  id: string;
  plate: string;
  route: string;
  status: BusStatus;
  etaMin?: number;
  nextStop?: string;
  load?: number;
};

export type Route = {
  id: string;
  name: string;
  from: string;
  to: string;
  stops: string[];
  fareNote: string;
};

export const ROUTES: Route[] = [
  {
    id: "r1",
    name: "Umuahia Central",
    from: "Nnenna Otti Terminal",
    to: "Umuahia Main Market",
    stops: ["Nnenna Otti Terminal", "Government House axis", "Umuahia Main Market"],
    fareNote: "Subsidised Green Shuttle fare",
  },
  {
    id: "r2",
    name: "Aba Corridor",
    from: "Aba Terminal",
    to: "Ariaria axis",
    stops: ["Aba Terminal", "Aba-Owerri Rd shelter", "Ariaria axis"],
    fareNote: "Subsidised Green Shuttle fare",
  },
  {
    id: "r3",
    name: "Inter-city link",
    from: "Umuahia",
    to: "Aba",
    stops: ["Nnenna Otti Terminal", "Express stop", "Aba Terminal"],
    fareNote: "Inter-city · subsidised",
  },
];

export const BUSES: Bus[] = [
  {
    id: "AGS-01",
    plate: "ABIA-EV-01",
    route: "Umuahia Central",
    status: "on-route",
    etaMin: 4,
    nextStop: "Government House axis",
    load: 62,
  },
  {
    id: "AGS-02",
    plate: "ABIA-EV-02",
    route: "Umuahia Central",
    status: "at-terminal",
    nextStop: "Nnenna Otti Terminal",
    load: 0,
  },
  {
    id: "AGS-07",
    plate: "ABIA-EV-07",
    route: "Aba Corridor",
    status: "on-route",
    etaMin: 11,
    nextStop: "Aba-Owerri Rd shelter",
    load: 48,
  },
  {
    id: "AGS-12",
    plate: "ABIA-EV-12",
    route: "Inter-city link",
    status: "on-route",
    etaMin: 28,
    nextStop: "Express stop",
    load: 71,
  },
  {
    id: "AGS-03",
    plate: "ABIA-EV-03",
    route: "Aba Corridor",
    status: "charging",
    load: 0,
  },
  {
    id: "AGS-09",
    plate: "ABIA-EV-09",
    route: "Umuahia Central",
    status: "maintenance",
    load: 0,
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
