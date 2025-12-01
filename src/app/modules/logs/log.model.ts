export interface LogMovement {
  id: number;
  createdAt: string;

  username: string;

  movementType: string;
  productName: string;
  quantity: number;
  description: string;

  branchName: string;
  originBranchName: string;

  beforeStock: number;
  afterStock: number;

  ip: string;
}
