import AuthState from "@/types/authStoreTypes";
import { UUID } from "crypto";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type MyPersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>
) => StateCreator<AuthState>;

export const useAuthStore = create<AuthState>(
  (persist as MyPersist)(
    (set) => ({
      loggedIn: false,
      access_token: null,
      userId: null,
      login: (token: string, uuid: UUID) =>
        set(() => ({
          loggedIn: true,
          access_token: token,
          userId: uuid,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);
