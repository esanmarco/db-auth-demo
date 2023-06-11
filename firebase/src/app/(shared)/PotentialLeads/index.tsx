"use client";

import { useFetchPotentialLeads } from "@/app/hooks/leads";
import ListItem from "./listItem";

export default function PotentialLeads() {
  const { isLoading, data, isError } = useFetchPotentialLeads();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>None today</div>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {data.map((lead: any, i: number) => (
        <ListItem key={`${lead.uid}-${i}`} {...lead} />
      ))}
    </ul>
  );
}
