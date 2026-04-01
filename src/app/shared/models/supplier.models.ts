export interface Supplier {
    fullName: string;
    birthDate: string;
    haveCni: boolean;
    cniNumber: string;
    cniExpireDate: string;
    haveDriverLicence: string;
    haveGuarantor: boolean;
    driverLicenceDebit: boolean;
    driverLicenceExpireDate: string;
    adress: string;
    email: string;
    phone: string;
    password: string;
    isAdressConfirmation: boolean;
    isNeigboorhoodConfirmation: boolean;
    location: string;
    isDriverValidated: boolean;
    isDriverValidatedTest: boolean;
    isDriverVerification: boolean;
    profilePicture: string;
    carTypeId?: number;
    createdById?: number;
    verifiedById?: number;
    testedById?: number;
    validatedById?: number
}

export interface SupplierResponse {
    id: 1;
    fullName: string;
    birthDate: string;
    haveCni: boolean;
    cniNumber: string;
    cniExpireDate: string;
    haveDriverLicence: boolean;
    haveGuarantor: boolean;
    driverLicenceDebit: boolean;
    driverLicenceExpireDate: string;
    adress: string;
    email: string;
    phone: string;
    isAdressConfirmation: boolean;
    isNeigboorhoodConfirmation: boolean;
    location: string;
    isDriverValidated: boolean;
    isDriverValidatedTest: boolean;
    isDriverVerification: boolean;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
}