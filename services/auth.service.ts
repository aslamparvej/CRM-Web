import axios from "@/lib/axios";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth.types";

class AuthService {
  async login(data: LoginPayload) {
    const res = await axios.post<AuthResponse>("/auth/login", data);
    return res.data;
  }

  async register(data: RegisterPayload) {
    const res = await axios.post<AuthResponse>("/auth/register", data);
    return res.data;
  }

  async me(token:string) {
    const res = await axios.get<AuthResponse>("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }


  async refresh() {
    const res = await axios.post<AuthResponse>("/auth/refresh");
    return res.data;
  }

  logout() {
    return axios.post("/auth/logout");
  }

  forgotPassword(email: string) {
    return axios.post("/auth/forgot-password", {
      email,
    });
  }

  resetPassword(token: string, password: string) {
    return axios.post("/auth/reset-password", {
      token,
      password,
    });
  }

  verifyEmail(token: string) {
    return axios.post("/auth/verify-email", {
      token,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
