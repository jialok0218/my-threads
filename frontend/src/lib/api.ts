// src/lib/api.ts

import API from "../config/apiClient";
import { RegisterData, LoginData, ResetPasswordData, User, Session } from "../types/auth";

// Register function
export const register = async (data: RegisterData): Promise<User> => {
  const response = await API.post<User>("/auth/register", data);
  return response.data;
};

// Login function
export const login = async (data: LoginData): Promise<{ token: string; user: User }> => {
  const response = await API.post<{ token: string; user: User }>("/auth/login", data);
  return response.data;
};

// Logout function
export const logout = async () => API.get("/auth/logout");

// Email verification function
export const verifyEmail = async (verificationCode: string): Promise<void> => {
  await API.get(`/auth/email/verify/${verificationCode}`);
};

// Send password reset email function
export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  await API.post("/auth/password/forgot", { email });
};

// Reset password function
export const resetPassword = async (data: ResetPasswordData): Promise<void> => {
  await API.post("/auth/password/reset", data);
};

// Get current user function
export const getUser = async () => API.get("/user");

// Get sessions function
export const getSessions = async (): Promise<Session[]> => {
  const response = await API.get<Session[]>("/sessions");
  return response.data;
};

// Delete session function
export const deleteSession = async (id: string): Promise<void> => {
  await API.delete(`/sessions/${id}`);
};
