// src/types/auth.ts

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    // Add any other fields you expect
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface ResetPasswordData {
    verificationCode: string;
    password: string;
  }
  
  export interface User {
    _id: string;
    email: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
    // Define other fields you expect in the user response
  }
  
  export interface Session {
    id: string;
    userId: string;
    createdAt: string;
    // Define other fields related to a session if needed
  }
  
  export interface AuthResponse {
    user: User;
    token: string;  // JWT token or session token
  }
  