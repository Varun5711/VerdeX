"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";


export default function OverviewPage() {
  const stats = useQuery(api.overview.getGlobalStats, {});

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1>Global KPIs</h1>
      <ul>
        <li>Facilities: {stats.facilities}</li>
        <li>Batches: {stats.batches}</li>
        <li>Retirements: {stats.retirements}</li>
      </ul>
    </div>
  );
}