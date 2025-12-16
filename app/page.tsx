import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import TreatmentPageClient from "./components/TreatmentPageClient";
// import { getQueryClient } from "@/lib/queryClientUtils";
import { GET_TREATMENTS, TREATMENTS } from "@/lib/constants/queryKeys";
import { treatmentService } from "@/lib/services/TreatmentService";

export default function TreatmentPage() {
  const queryClient = new QueryClient();
  // const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: [TREATMENTS, GET_TREATMENTS],
    queryFn: async () => {
      await treatmentService.getTreatments();
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TreatmentPageClient />
    </HydrationBoundary>
  );
}