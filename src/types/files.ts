export interface LearningFile {
  name: string;
  type: string;
  content: string;
  size: number;
  uploadedAt: string;
  tone: 'professional' | 'casual' | 'friendly';
}