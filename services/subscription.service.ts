import axios from "@/lib/axios";
import type { Subscription } from "@/types/subscription.types";

export interface SubscriptionQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

class SubscriptionService {
  getAll(params?: SubscriptionQuery) {
    return axios
      .get<Subscription[]>("/subscriptions", {
        params,
      })
      .then((res) => res.data);
  }

  getById(id: string) {
    return axios
      .get<Subscription>(`/subscriptions/${id}`)
      .then((res) => res.data);
  }

  create(data: Partial<Subscription>) {
    return axios
      .post<Subscription>("/subscriptions", data)
      .then((res) => res.data);
  }

  update(
    id: string,
    data: Partial<Subscription>
  ) {
    return axios
      .put<Subscription>(`/subscriptions/${id}`, data)
      .then((res) => res.data);
  }

  cancel(id: string) {
    return axios.patch(
      `/subscriptions/${id}/cancel`
    );
  }

  activate(id: string) {
    return axios.patch(
      `/subscriptions/${id}/activate`
    );
  }

  renew(id: string) {
    return axios.patch(
      `/subscriptions/${id}/renew`
    );
  }

  changePlan(
    id: string,
    planId: string
  ) {
    return axios.patch(
      `/subscriptions/${id}/change-plan`,
      {
        planId,
      }
    );
  }

  getInvoices(id: string) {
    return axios
      .get(`/subscriptions/${id}/invoices`)
      .then((res) => res.data);
  }
}

export default new SubscriptionService();