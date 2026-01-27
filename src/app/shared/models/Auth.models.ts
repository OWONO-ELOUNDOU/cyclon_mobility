export interface LoginRequest {
    phone: string;
    password: string
}

export interface LoginResponse {
    access_token: string;
    user: UserLoginResponse;
}

export interface UserLoginResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    isDriverValidated: boolean;
    rule: Rule;
}

export interface Rule {
    id: number;
    name: string;
}

export interface ProfilePicture {
    file: File,
    categoryFile?: 'license' | 'insurance' | 'registration' | 'inspection' | 'profile';
}