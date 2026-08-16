import { create } from "zustand";

import type { User, UserQuery } from "@/types/user.types";
import userService from "@/services/user.service";

interface UserStore {
  users: User[];

  loadUsers: (params?: UserQuery) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  removeUser: (id: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],

  loadUsers: async (params) => {
    try {
      const response = await userService.getAll(params);
      console.log(response.data);
      set({ users: response.data });
    } catch (error) {
      console.error("Error loading users:", error);
    }
  },

  asignOrganization: async (userId: string, organizationId: string) => {
    try {
      const response = await userService.asignOrganization(userId, organizationId);
      console.log(response.data);
      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? { ...user, organizationId } : user
        ),
      }));
    } catch (error) {
      console.error("Error assigning user:", error);
    }
  },

  setUsers: (users) => set({ users }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u._id === user._id ? user : u)),
    })),

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u._id !== id),
    })),
}));
