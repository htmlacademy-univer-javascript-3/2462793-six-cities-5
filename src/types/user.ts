export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type LoginInfo = {
  email: string;
  password: string;
};

export type AuthInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};
