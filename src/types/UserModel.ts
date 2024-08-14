export interface UserRole {
  id: number;
  roleId: number;
  userId: number;
  createdDate: string;
  updatedDate: string;
}

export interface UserModel {
  id: number;
  name: string;
  email: string;
  createdDate: string;
  updatedDate: string;
  userRole: UserRole[];
}
