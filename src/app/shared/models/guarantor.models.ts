export interface Guarantor {
    firstName: string;
    lastName: string;
    birthDate: string; // ISO format date string
    cniNumber: string;
    cniExpireDate: string; // ISO format date string
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
    email: string; // ISO format date string
}