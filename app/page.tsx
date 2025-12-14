import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import TreatmentPageClient from "./components/TreatmentPageClient";
import { getQueryClient } from "@/lib/queryClientUtils";
import { GET_TREATMENTS, TREATMENTS } from "@/lib/constants/queryKeys";

export default function TreatmentPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: [TREATMENTS, GET_TREATMENTS],
    queryFn: async () => {
      return;
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TreatmentPageClient />
    </HydrationBoundary>
  );
}