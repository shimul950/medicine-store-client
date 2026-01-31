export interface MedicineInput {
    id:string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    sellerId: string;
    categoryName: string;
}