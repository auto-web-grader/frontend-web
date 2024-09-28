export type User = {
  user_id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  token: string;
};
