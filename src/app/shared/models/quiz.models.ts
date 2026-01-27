export interface Quiz {
    title: string;
    totalAvrage: number;
    minAvrage: number;
    maxAvrage: number;
}

export interface QuizResponse {
    id: number;
    title: string;
    totalAerage: number;
    minAvrage: number;
    maxAvrage: number;
    createdAt: string;
    updatedAt: string;
}