export type userType = {
  id: string;
  email: string;
  createdAt: string;
  image: string | null;
  isActive: number;
  isDeleted: number;
  location: string;
  name: string;
  password: string;
  role: string;
  updatedAt: string;
  phone?: string;
  joinedAt?: string;
};
