export enum FileType {
  PDF = 'PDF',
  DOC = 'DOC',
  SHEET = 'SHEET',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  CODE = 'CODE',
  ARCHIVE = 'ARCHIVE',
  NOTE = 'NOTE', // New type for manual notes
  UNKNOWN = 'UNKNOWN'
}

export enum ProjectCategory {
  PROJECT_INFO = 'PROJECT_INFO',
  DOCUMENTS = 'DOCUMENTS',
  SOURCE_CODE = 'SOURCE_CODE',
  OTHERS = 'OTHERS'
}

export interface FileMetadata {
  description: string;
  tags: string[];
  suggestedName: string;
  category: ProjectCategory;
}

export interface VirtualFile {
  id: string;
  name: string;
  originalUrl: string;
  size: string; // Simulated size
  type: FileType;
  content?: string; // Optional content for manual notes
  metadata?: FileMetadata;
  createdAt: Date;
  status: 'syncing' | 'synced' | 'error';
}

export interface StorageStats {
  used: number; // in GB
  total: number; // in GB
}