export type RegisterUser = {
  username: string;
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type PublicUser = {
  id: string;
  username: string;
  email: string;
};

export type AuthResponse = {
  user: PublicUser;
};
