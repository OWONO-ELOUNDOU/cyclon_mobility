import { Supplier, SupplierResponse } from "./supplier.models";

export interface Guarantor {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string; 
    cniNumber: string;
    cniExpireDate: string; 
    adress: string;
    phone: string;
    profilePicture: string;
    guarandAffiliation: string;
    driver: SupplierResponse;
    createdAt?: string;
    updatedAt?: string;
}

export interface GuarantorResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string; 
}

export interface GuarantorProfilePictureUpdateRequest {
    file: File;
}