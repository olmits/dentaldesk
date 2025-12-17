import { Treatment, TreatmentStatus } from "../types";

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

export interface AddTreatmentParams {
    patient: string;
    procedure: string;
    dentist: string;
    date: string;
    status?: TreatmentStatus;
    notes?: string;
    cost?: number;
};

// export interface AddTreatmentResponse {
//     success: boolean;
//     treatment: Treatment;
// }
