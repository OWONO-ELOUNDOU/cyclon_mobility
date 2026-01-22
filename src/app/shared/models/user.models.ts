export interface User {
    firstName: string;
    lastName: string;
    birthDate: string;
    cniNumber: string;
    cniExpireDate: string;
    driverLicenceExpireDate: string;
    adress: string;
    email: string;
    phone: string;
    password: string;
    isActive: boolean;
    isDriverValidated: boolean;
    profilePicture: string;
    ruleId?: number;
    createdById?: number;
}

export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}

// Interface pour le garant
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