type Full_Info = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
  isDeleted: number;
  role: 'EMPLOYEE' | 'OWNER' | 'ADMIN';
  location: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
};

type Partial_Info = {
  id: string;
};

type User_Info = Full_Info | Partial_Info;
