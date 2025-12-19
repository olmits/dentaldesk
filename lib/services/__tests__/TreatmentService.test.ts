import { Treatment } from '@/lib/types';

import { treatmentService } from '../TreatmentService';
import { GetTreatmentsResponse } from '../TreatmentService.types';

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('TreatmentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTreatments', () => {
    it('should fetch treatments successfully', async () => {
      const mockResponse: GetTreatmentsResponse = {
        data: [],
        total: 0,
        page: 1,
        pageSize: 9,
        totalPages: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await treatmentService.getTreatments();

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/treatments',
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('should include query parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      } as Response);

      await treatmentService.getTreatments({
        search: 'John',
        status: 'in_progress',
        page: 2,
        pageSize: 20,
      });

      const callUrl = mockFetch.mock.calls[0][0] as string;
      expect(callUrl).toContain('search=John');
      expect(callUrl).toContain('status=in_progress');
      expect(callUrl).toContain('page=2');
      expect(callUrl).toContain('pageSize=20');
    });

    it('should throw error on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(treatmentService.getTreatments()).rejects.toThrow();
    });
  });

  describe('addTreatment', () => {
    it('should add treatment successfully', async () => {
      const newTreatment = {
        patient: 'John Doe',
        procedure: 'Cleaning',
        dentist: 'Dr. Smith',
        date: '2025-01-15',
        status: 'scheduled' as const,
      };

      const mockResponse = { id: 1, ...newTreatment };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await treatmentService.addTreatment(newTreatment);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/treatments',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newTreatment),
        })
      );
    });

    it('should throw error on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      } as Response);

      await expect(
        treatmentService.addTreatment({} as Treatment)
      ).rejects.toThrow();
    });
  });

  describe('updateTreatmentStatus', () => {
    it('should update status successfully', async () => {
      const mockResponse = {
        id: 1,
        patientName: 'John Doe',
        status: 'completed',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await treatmentService.updateTreatmentStatus('completed', 1);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/treatments/1',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ status: 'completed' }),
        })
      );
    });

    it('should throw error on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(
        treatmentService.updateTreatmentStatus('completed', 1)
      ).rejects.toThrow();
    });
  });
});