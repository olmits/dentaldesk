import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { GET_TREATMENTS, TREATMENTS } from "@/lib/constants/queryKeys";
import { treatmentService } from "@/lib/services/TreatmentService";
import { SearchProvider } from "@/context/SearchProvider";

import TreatmentPageClient from "./_components/TreatmentPageClient";

export default function TreatmentPage() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: [TREATMENTS, GET_TREATMENTS],
    queryFn: async () => {
      await treatmentService.getTreatments();
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchProvider>
        <TreatmentPageClient />
      </SearchProvider>
    </HydrationBoundary>
  );
}