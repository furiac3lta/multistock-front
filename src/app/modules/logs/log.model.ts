export interface LogMovement {
  id: number;
  createdAt: string;
  action: string;
  username: string;
  productId: number;
  branchId: number;
  branchName: string;
  beforeStock: number;
  afterStock: number;
  ip: string;
}
