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
    userId: number;
    quizId: number;
    note: number;
    file: string;
}

export interface userQuiz {
    id: number;
    userId: number;
    quizId: number;
    note: number;
}