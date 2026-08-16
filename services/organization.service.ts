import axios from "@/lib/axios";
import type { Organization } from "@/types/organization.types";

export interface TenantQuery {
  page?: number;
  limit?: number;
  search?: string;
  plan?: string;
  status?: string;
}

export interface GetReponse {
  success: boolean;
  data: Organization[];
  message: string,
}

class OrganizationService {
  async getAll(params?: TenantQuery) {
    const res = await axios.get<GetReponse>("/organizations", {
      params,
    });
    console.log(res.data);
    return res.data;
  }

  async getById(id: string) {
    const res = await axios.get<Organization>(`/organizations/${id}`);
    return res.data;
  }

  async create(data: Partial<Organization>) {
    const res = await axios.post<Organization>("/organizations", data);
    return res.data;
  }

  async update(id: string, data: Partial<Organization>) {
    const res = await axios.put<Organization>(`/organizations/${id}`, data);
    return res.data;
  }

  delete(id: string) {
    return axios.delete(`/organizations/${id}`);
  }

  suspend(id: string) {
    return axios.patch(`/organizations/${id}/suspend`);
  }

  activate(id: string) {
    return axios.patch(`/organizations/${id}/activate`);
  }

  async getStatistics(id: string) {
    const res = await axios.get(`/organizations/${id}/statistics`);
    return res.data;
  }

  async getUsers(id: string) {
    const res = await axios.get(`/organizations/${id}/users`);
    return res.data;
  }

  async getSubscription(id: string) {
    const res = await axios.get(`/organizations/${id}/subscription`);
    return res.data;
  }

  async loginAsTenant(id: string) {
    const res = await axios.post(`/organizations/${id}/login-as`);
    return res.data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new OrganizationService();
