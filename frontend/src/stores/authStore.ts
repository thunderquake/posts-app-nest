import AuthState from "@/types/authStoreTypes";
import { UUID } from "crypto";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type PersistAuthStore = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>
) => StateCreator<AuthState>;

export const useAuthStore = create<AuthState>(
  (persist as PersistAuthStore)(
    (set) => ({
      loggedIn: false,
      access_token: null,
      userId: null,
      username: null,
      email: null,

      login: (token: string, uuid: UUID) =>
        set(() => ({
          loggedIn: true,
          access_token: token,
          userId: uuid,
        })),

      logout: () =>
        set(() => ({
          loggedIn: false,
          access_token: null,
          userId: null,
          username: null,
          email: null,
        })),

      setUserDetails: (username: string, email: string) =>
        set(() => ({
          username,
          email,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);
