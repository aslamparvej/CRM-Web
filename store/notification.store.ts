import { create } from "zustand";

interface Notification {
  id: string;

  title: string;

  message: string;

  isRead: boolean;

  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];

  unreadCount: number;

  setNotifications: (
    notifications: Notification[]
  ) => void;

  addNotification: (
    notification: Notification
  ) => void;

  markAsRead: (id: string) => void;

  clear: () => void;
}

export const useNotificationStore =
  create<NotificationStore>((set) => ({
    notifications: [],

    unreadCount: 0,

    setNotifications: (notifications) =>
      set({
        notifications,
        unreadCount: notifications.filter(
          (n) => !n.isRead
        ).length,
      }),

    addNotification: (notification) =>
      set((state) => ({
        notifications: [
          notification,
          ...state.notifications,
        ],
        unreadCount: state.unreadCount + 1,
      })),

    markAsRead: (id) =>
      set((state) => {
        const notifications =
          state.notifications.map((n) =>
            n.id === id
              ? { ...n, isRead: true }
              : n
          );

        return {
          notifications,
          unreadCount: notifications.filter(
            (n) => !n.isRead
          ).length,
        };
      }),

    clear: () =>
      set({
        notifications: [],
        unreadCount: 0,
      }),
  }));