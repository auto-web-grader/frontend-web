export type User = {
  user_id: string;
  nama: string;
  email: string;
  role: 'student' | 'admin';
  token: string;
};
