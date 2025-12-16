"use client";

import { useEffect, useState } from "react";

import type { Treatment, TreatmentStatus } from "@/lib/types";

import AddTreatment from "./AddTreatment";
import TreatmentsSearch from "./TreatmentsSearch";
import TreatmentsFilter from "./TreatmentsFilter";
import TreatmentsCount from "./TreatmentsCount";
import TreatmentsList from "./TreatmentsList";


export default function TreatmentsPageClient() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [filtered, setFiltered] = useState<Treatment[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TreatmentStatus | "all">("all");
  // const [isLoading, setIsLoading] = useState(false);
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   async function load() {
  //     setIsLoading(true);
  //     try {
  //       const data = await treatmentService.getTreatments();
  //       const items = data.data;

  //       setTreatments(items);
  //       setFiltered(items);
  //       setTotal(items.length);
  //     } catch (error) {
  //       console.error("Failed to load treatments:", error);
  //       // Handle error state if needed
  //       setTreatments([]);
  //       setFiltered([]);
  //       setTotal(0);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   load();
  // }, []);

  useEffect(() => {
    let next = [...treatments];

    if (search.trim()) {
      const query = search.toLowerCase();
      next = next.filter((item) => {
        return (
          item.patient.toLowerCase().includes(query) ||
          item.procedure.toLowerCase().includes(query) ||
          item.dentist.toLowerCase().includes(query)
        );
      });
    }

    if (status !== "all") {
      next = next.filter((item) => (item.status || "unknown") === status);
    }

    // eslint-disable-next-line
    setFiltered(next);
  }, [search, status, treatments]);

  return (
    <>
      <section className="flex flex-col gap-4 rounded-lg border bg-card/40 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <TreatmentsSearch />
            <TreatmentsFilter />
          </div>

          <AddTreatment />
        </div>

        <TreatmentsCount />
      </section>
      <TreatmentsList />
    </>
  );
}
