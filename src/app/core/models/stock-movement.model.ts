export interface StockMovement {
  id: number;
  productId: number;
  quantity: number;
  movementType: string;
  description: string;
  createdBy: string;
  createdAt: string;
  previousStock: number;
  newStock: number;
    branchId?: number;   // 🔥 AGREGAR ESTA LÍNEA

}
