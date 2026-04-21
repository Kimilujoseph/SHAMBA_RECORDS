export interface RegisterDto {
  email: string;
  password: string;
  role?: "ADMIN" | "AGENT";
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface usersResponseDto {
  user: {
    id: string;
    email: string;
    role: string;
    createdAt: Date;
  };
}
