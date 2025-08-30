"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import HeroSection from "../components/hero/HeroSection"
import Publicnavbar from "../components/nav/Publicnavbar"


export default function Page() {
  return (
    <main>
      <Publicnavbar />
      <HeroSection />
      <HomePage />
    </main>
  )
}

function HomePage() {
  const facility = useQuery(api.facilities.getFirst);
  const meters = useQuery(api.meters.listByFacility, facility ? { facilityId: facility._id } : "skip");

  return (
    <div>
      <h2>Meters</h2>
      {meters === undefined && <p>Loading meters...</p>}
      {meters && meters.length === 0 && <p>No meters found.</p>}
      {meters && meters.length > 0 && (
        <ul>
          {meters.map((meter) => (
            <li key={meter._id}>{meter.meterId} - {meter.kind} - {meter.unit}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
