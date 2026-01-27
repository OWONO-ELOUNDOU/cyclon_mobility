export interface FileRequest {
  file: File;
  categoryFile: string;
}

export interface FileTypeResponse {
  id: number;
  fileName: string;
  userId: number;
  categoryFile: string;
}