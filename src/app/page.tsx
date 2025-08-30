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
  
  return (
    <></>
  );
}
