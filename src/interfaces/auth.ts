export type TAuthCredential = {
  email?: string;
  token: string;
  refreshToken: string;
};

export type TAuthState = {
  credential: TAuthCredential | null;
};

export type TAuthEvent = {
  isAuthenticated: () => boolean;
  setCredential: (value: TAuthCredential) => void;
  signOut: () => void;
  reset: () => void;
};

export type TAuthStore = TAuthState & TAuthEvent;
