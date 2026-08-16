"use client";

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

import { useAuthStore } from "@/store/auth.store";

let socket: Socket | null = null;

export function useSocket() {
  const { accessToken, user } = useAuthStore();

  useEffect(() => {
    if (!accessToken || !user) return;

    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
        transports: ["websocket"],
        withCredentials: true,
        auth: {
          token: accessToken,
        },
      });
    }

    socket.on("connect", () => {
      console.log("✅ Socket Connected");

      socket?.emit("join", {
        userId: user.id,
        tenantId: user.tenantId,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
    });

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
    };
  }, [accessToken, user]);

  return socket;
}