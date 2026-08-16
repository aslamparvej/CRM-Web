import axios from "@/lib/axios";

export interface Notification {
  id: string;

  title: string;

  message: string;

  type:
    | "SYSTEM"
    | "LEAD"
    | "FOLLOWUP"
    | "USER";

  isRead: boolean;

  createdAt: string;
}

export interface NotificationQuery {
  page?: number;
  limit?: number;
  unread?: boolean;
}

class NotificationService {
  getAll(params?: NotificationQuery) {
    return axios
      .get<Notification[]>("/notifications", {
        params,
      })
      .then((res) => res.data);
  }

  getUnreadCount() {
    return axios
      .get<number>("/notifications/unread-count")
      .then((res) => res.data);
  }

  markAsRead(id: string) {
    return axios.patch(
      `/notifications/${id}/read`
    );
  }

  markAllAsRead() {
    return axios.patch(
      "/notifications/read-all"
    );
  }

  delete(id: string) {
    return axios.delete(
      `/notifications/${id}`
    );
  }

  clear() {
    return axios.delete(
      "/notifications/clear"
    );
  }
}

export default new NotificationService();