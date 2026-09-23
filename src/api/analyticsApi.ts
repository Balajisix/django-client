import { apiClient } from "../lib/apiClient";
import type { ClaimsDashboard } from "../types/analytics";

export const analyticsApi = {
  async getDashboard(): Promise<ClaimsDashboard> {
    const response =
      await apiClient.get<ClaimsDashboard>(
        "/analytics/dashboard/",
      );

    return response.data;
  },
};