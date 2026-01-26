export interface Guarantor {
    firstName: string;
    lastName: string;
    birthDate: string; 
    cniNumber: string;
    cniExpireDate: string; 
    adress: string;
    phone: string;
    profilePicture: string;
    guarandAffiliation: string;
    driver_id: number;
}

export interface GuarantorResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string; 
}