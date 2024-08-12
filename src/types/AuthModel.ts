export interface AuthModel {
  idUser: number;
  email: string;
  name: string;
  roles: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiredTime: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}