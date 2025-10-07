export type User = {
  id: number;
  email: string;
  full_name?: string | null;
  is_active?: boolean;
  is_superuser?: boolean;
};

export type TokenResponse =
  | { accessToken: string; tokenType?: string }
  | { access_token: string; token_type?: string };
