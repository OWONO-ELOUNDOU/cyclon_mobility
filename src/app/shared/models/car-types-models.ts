import { Supplier } from "./supplier.models";

export interface CarType {
    id: number;
    label: string;
    alertQuantity: number;
    drivers: Supplier[];
    createdAt: string;
    updatedAt: string;
}