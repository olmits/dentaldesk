"use client";

import { useEffect, useState } from "react";

import type { Treatment, TreatmentStatus } from "@/lib/types";

import TreatmentCard from "./components/TreatmentCard";
import AddTreatment from "./components/AddTreatment";
import SearchTreatment from "./components/SearchTreatment";
import FilterTreatment from "./components/FilterTreatment";


export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [filtered, setFiltered] = useState<Treatment[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TreatmentStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const response = await fetch("/api/treatments");
      const data = await response.json();
      const items = data.data ?? [];

      setTreatments(items);
      setFiltered(items);
      setTotal(items.length);
      setIsLoading(false);
    }

    load();
  }, []);

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
            <SearchTreatment search={search} onSearchChange={setSearch} />
            <FilterTreatment status={status} onChangeStatus={setStatus} />
          </div>

          <AddTreatment />
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filtered.length} of {total} treatments
        </div>
      </section>

      {isLoading ? (
        <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
          Loading treatments...
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((treatment, index) => (
            <TreatmentCard key={index} treatment={treatment} />
          ))}
        </div>
      )}
    </>
  );
}
