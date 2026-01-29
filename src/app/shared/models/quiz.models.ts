import { SupplierResponse } from "./supplier.models";

export interface Quiz {
    title: string;
    totalAvrage: number;
    minAvrage: number;
    maxAvrage: number;
}

export interface QuizResponse {
    id: number;
    title: string;
    totalAvrage: number;
    minAvrage: number;
    maxAvrage: number;
    createdAt: string;
    updatedAt: string;
}

export interface UserQuizRequest {
    driverId: number;
    quizId: number;
    note: number;
    file: string;
}

export interface userQuiz {
    id: number;
    driverId: number;
    driver: SupplierResponse;
    quizId: number;
    quiz: QuizResponse;
    note: number;
}