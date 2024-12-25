import { UUID } from "crypto";

export default interface AuthState {
  loggedIn: boolean;
  access_token: string | null;
  userId: UUID | null;
  login: (token: string, uuid: UUID) => void;
}
