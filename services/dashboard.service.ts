import axios from "@/lib/axios";
import type {
  Activity,
  DashboardStats,
  MonthlyAnalytics,
} from "@/types/dashboard.types";

class DashboardService {
  async getStats() {
    const res = await axios.get<DashboardStats>("/dashboard/stats");
    return res.data;
  }

  async getAnalytics(period = "month") {
    const res = await axios.get<MonthlyAnalytics[]>("/dashboard/analytics", {
      params: { period },
    });
    return res.data;
  }

  async getActivities(limit = 10) {
    const res = await axios.get<Activity[]>("/dashboard/activities", {
      params: { limit },
    });
    return res.data;
  }

  async getLeadSources() {
    const res = await axios.get("/dashboard/lead-sources");
    return res.data;
  }

  async getLeadStatus() {
    const res = await axios.get("/dashboard/lead-status");
    return res.data;
  }

  async getRevenue(period = "month") {
    const res = await axios.get("/dashboard/revenue", {
      params: { period },
    });
    return res.data;
  }

  async getConversionRate() {
    const res = await axios.get("/dashboard/conversion-rate");
    return res.data;
  }

  async getAgentPerformance() {
    const res = await axios.get("/dashboard/agent-performance");
    return res.data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DashboardService();