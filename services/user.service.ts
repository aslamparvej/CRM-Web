import axios from "@/lib/axios";
import type { User, RegisterPayload } from "@/types/user.types";

export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface UserResponse {
  success: boolean;
  data: User[];
  message: string;
}

class UserService {
  async getAll(params?: UserQuery) {
    const res = await axios.get<UserResponse>("/users", {
      params,
    });
    return res.data;
  }

  async getById(id: string) {
    const res = await axios.get<User>(`/users/${id}`);
    return res.data;
  }

  async create(data: Partial<RegisterPayload>) {
    console.log("Creating user with data:", data);
    const res = await axios.post<User>("/users", data);
    console.log("User created successfully:", res.data);
    return res.data;
  }

  async update(id: string, data: Partial<User>) {
    const res = await axios.put<User>(`/users/${id}`, data);
    return res.data;
  }

  delete(id: string) {
    return axios.delete(`/users/${id}`);
  }

  activate(id: string) {
    return axios.patch(`/users/${id}/activate`);
  }

  deactivate(id: string) {
    return axios.patch(`/users/${id}/deactivate`);
  }

  resetPassword(id: string) {
    return axios.post(`/users/${id}/reset-password`);
  }

  async asignOrganization(userId: string, organizationId: string) {
    const res = await axios.patch<{success: boolean, message: string, data: User}>(`/users/${userId}/assign`, {
      organizationId,
    });
    return res.data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
