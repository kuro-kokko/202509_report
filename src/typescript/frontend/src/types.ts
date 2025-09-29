export interface User {
  id: number;
  name: string;
  age: number;
  del_flg: boolean;
}

export interface SearchResponse {
  users: User[];
  total: number;
}

export interface ErrorResponse {
  error: string;
}
