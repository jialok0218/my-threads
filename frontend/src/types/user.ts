// user.ts
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  gender?: 'male' | 'female';
}
  