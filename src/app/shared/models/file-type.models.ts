export interface FileRequest {
  image: File;
  categoryFile: string;
}

export interface FileTypeResponse {
  id: number;
  fileName: string;
  userId: number;
  categoryFile: string;
}