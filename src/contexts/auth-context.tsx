"use client"

import { type ReactNode, createContext, useContext } from "react";
import { useMutation, useQuery } from "react-query";

import { api } from "@/lib/api";

import type { User } from "@/types/user";

type LoginPayload = {
  username: string,
  password: string,
}

type RegisterPayload = {
  id: string,
  email: string,
  name: string,
  password: string,
}

type LoginResponse = {
  token: string
}

type TAuthContext = {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<LoginResponse>
  logout: () => Promise<unknown>
  register: (id: string, email: string, name: string, password: string) => Promise<unknown>
}

const AuthContext = createContext<TAuthContext | null>(null)

const authRoutes = {
  getUser: () => api.get<User>('/auth/user'),
  login: (data: LoginPayload) => api.post<LoginResponse>("/auth/login", data),
  logout: () => api.post<unknown>("/auth/logout"),
  register: (data: RegisterPayload) => api.post<unknown>("/auth/register", data),
}

export function AuthProvider({ children }: { children?: ReactNode }) {
  const { data, isLoading, refetch, error } = useQuery(`user`, authRoutes.getUser, { retry: 0, });

  const { mutateAsync: loginMutation } = useMutation({ mutationFn: authRoutes.login })
  const { mutateAsync: logoutMutation } = useMutation({ mutationFn: authRoutes.logout })
  const { mutateAsync: registerMutation } = useMutation({ mutationFn: authRoutes.register })

  const login = async (username: string, password: string) => {
    const { data } = await loginMutation({ username, password })

    await refetch()

    return data;
  }

  const register = async (
    id: string,
    email: string,
    name: string,
    password: string,
  ) => {
    const { data } = await registerMutation({
      id,
      email,
      name,
      password,
    })

    return data;
  }

  const logout = async () => {
    const { data } = await logoutMutation()
    
    await refetch()

    return data;
  }

  return (
    <AuthContext.Provider
      value={{
        user: data && !error ? data.data : null,
        loading: isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) throw new Error("'useAuth' hook should be used inside a 'AuthProvider' component.")

  return context
}