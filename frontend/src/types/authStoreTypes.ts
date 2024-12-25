import { UUID } from "crypto";

export default interface AuthState {
  loggedIn: boolean;
  access_token: string | null;
  userId: UUID | null;
  username: string | null;
  email: string | null;
  login: (token: string, uuid: UUID) => void;
  logout: () => void;
  setUserDetails: (username: string, email: string) => void;
}
