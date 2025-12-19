import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GET_TREATMENTS, TREATMENTS } from "@/lib/constants/queryConstants";

interface TreatmentsListErrorProps {
  error?: Error | null;
}

export default function TreatmentsListError({ 
  error, 
}: TreatmentsListErrorProps) {
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.invalidateQueries({
      queryKey: [TREATMENTS, GET_TREATMENTS]
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <div className="font-medium mb-1">Failed to load treatments</div>
            <div className="text-muted-foreground">
              {error?.message || "There was an error loading the treatments. Please check your connection and try again."}
            </div>
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleRetry}
            variant="outline"
            size="sm"
            className="gap-2 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}