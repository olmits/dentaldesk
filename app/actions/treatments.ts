"use server";

import type { Treatment, TreatmentStatus } from "@/lib/types";

export interface SearchTreatmentsParams {
  search?: string;
  status?: TreatmentStatus | "all";
  page?: number;
  pageSize?: number;
}

export interface SearchTreatmentsResult {
  data: Treatment[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function searchTreatments(
  params: SearchTreatmentsParams = {}
): Promise<SearchTreatmentsResult> {
  const { search = "", status = "all", page = 1, pageSize = 9 } = params;
  
  // Build query parameters
  const queryParams = new URLSearchParams();
  
  if (search.trim()) {
    queryParams.set("search", search.trim());
  }
  
  if (status && status !== "all") {
    queryParams.set("status", status);
  }
  
  queryParams.set("page", page.toString());
  queryParams.set("pageSize", pageSize.toString());
  
  // Make request to our API endpoint
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/treatments?${queryParams.toString()}`;
  
  try {
    const response = await fetch(url, {
      // Add cache control for server-side requests
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch treatments: ${response.status}`);
    }
    
    const result = await response.json();
    
    return {
      data: result.data || [],
      total: result.total || 0,
      page: result.page || 1,
      pageSize: result.pageSize || 9,
      totalPages: result.totalPages || 1,
    };
  } catch (error) {
    console.error("Error fetching treatments:", error);
    
    // Return empty result on error
    return {
      data: [],
      total: 0,
      page: 1,
      pageSize: 9,
      totalPages: 1,
    };
  }
}