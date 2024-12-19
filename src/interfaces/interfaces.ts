export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  type: number;
}

export interface UserJWT {
  id: number;
  username: string;
  email: string;
  type: number;
}
