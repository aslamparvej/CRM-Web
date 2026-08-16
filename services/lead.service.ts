import axios from "@/lib/axios";
import type { Lead } from "@/types/lead.types";

export interface LeadQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  category?: string;
}

class LeadService {
  async getAll(params?: LeadQuery) {
    const res = await axios.get<Lead[]>("/leads", {
      params,
    });
    return res.data;
  }

  async getById(id: string) {
    const res = await axios.get<Lead>(`/leads/${id}`);
    return res.data;
  }

  async create(data: Partial<Lead>) {
    const res = await axios.post<Lead>("/leads", data);
    return res.data;
  }

  async update(id: string, data: Partial<Lead>) {
    const res = await axios.put<Lead>(`/leads/${id}`, data);
    return res.data;
  }

  delete(id: string) {
    return axios.delete(`/leads/${id}`);
  }

  assign(leadId: string, userId: string) {
    return axios.patch(`/leads/${leadId}/assign`, { userId });
  }

  changeStatus(leadId: string, status: string) {
    return axios.patch(`/leads/${leadId}/status`, { status });
  }

  addNote(leadId: string, note: string) {
    return axios.post(`/leads/${leadId}/notes`, { note });
  }

  importCSV(file: FormData) {
    return axios.post("/leads/import", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  exportCSV() {
    return axios.get("/leads/export", {
      responseType: "blob",
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LeadService();