"use client";

import AddTreatment from "./AddTreatment/AddTreatment";
import TreatmentsSearch from "./TreatmentsSearch";
import TreatmentsFilter from "./TreatmentsFilter";
import TreatmentsCount from "./TreatmentsCount";
import TreatmentsList from "./TreatmentsList";


export default function TreatmentsPageClient() {
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
