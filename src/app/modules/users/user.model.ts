export interface User {
  id: number;
  username: string;
  fullName: string;
  phone: string;
  active: boolean;

  branchId: number;
  branchName: string;

  roles: string[];
}
