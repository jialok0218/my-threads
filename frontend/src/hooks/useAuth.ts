import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";
import { User } from '../types/auth';
import { AxiosResponse } from 'axios';

export const AUTH = "auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  // ... other properties your auth context might have
}

const useAuth = (): AuthContextType => {
  const { data: user } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
  }) as { data: User | null };

  return {
    user,
    isLoading: false,
    isError: false,
  };
};

export default useAuth;