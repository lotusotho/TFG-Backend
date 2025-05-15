export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  blog_id: number;
  type: number;
}

export interface UserJWT {
  id: number;
  username: string;
  isverified: boolean;
  type: number;
}
