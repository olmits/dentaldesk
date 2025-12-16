import type { Treatment, TreatmentStatus } from "@/lib/types";

export interface GetTreatmentsParams {
  search?: string;
  status?: TreatmentStatus | "all";
  page?: number;
  pageSize?: number;
}

export interface GetTreatmentsResponse {
  data: Treatment[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

class TreatmentService {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  async getTreatments(params: GetTreatmentsParams = {}): Promise<GetTreatmentsResponse> {
    const { search, status, page, pageSize } = params;
    
    const queryParams = new URLSearchParams();
    
    if (search && typeof search === "string") {
      queryParams.set("search", search.trim());
    }
    
    if (status && status !== "all") {
      queryParams.set("status", status);
    }
    
    if (page && page > 0) {
      queryParams.set("page", page.toString());
    }
    
    if (pageSize && pageSize > 0) {
      queryParams.set("pageSize", pageSize.toString());
    }
    
    const url = `${this.baseUrl}/treatments${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as GetTreatmentsResponse;

      return {
        data: data.data || [],
        total: data.total || 0,
        page: data.page || 1,
        pageSize: data.pageSize || 9,
        totalPages: data.totalPages || 1,
      };
    } catch (error) {
      console.error("Error fetching treatments:", error);
      throw new Error(
        error instanceof Error 
          ? `Failed to fetch treatments: ${error.message}`
          : "Failed to fetch treatments"
      );
    }
  }
}

export const treatmentService = new TreatmentService();

export default TreatmentService;