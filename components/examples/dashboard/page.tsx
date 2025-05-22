import { NavButton } from "@/components/examples/dashboard/components/nav-button";

import data from "./data.json";

export const meta = {
  title: "My Dashboard",
  description: "Shows dashboard data",
};

export default function Page() {
  return (
    <div>
      Dashboard
      <NavButton />
      {data.map((d) => (
        <div key={d.id}>{d.name}</div>
      ))}
    </div>
  );
}
