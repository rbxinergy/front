export interface Quest {
  id: number;
  name: string;
  questions: Question[];
  questId: number;
  subDomain: number;
  subDomainName: string;
  companyId: number;
  documentNumber: string;
  companyName: string;
  description: string;
  status: boolean;
  createdAt: Date;
  deletedAt: Date | null;
  group: boolean;
  clientName: string;
  visibility: boolean;
}

export interface Question {
  id: number;
  text: string;
  type: string;
  version: number;
  companyId:number;
  visibility: boolean;
  questionId: number;
  percentage: number;
  criticality: number;
  hasFile: boolean;
  isRequired: boolean;
  isRequiredFile: boolean;
  group: boolean;
  sortOrder: number;
  answers: Answer[];
  labels: Label[];
}

export interface Label {
  name: string;
}

export interface Answer {
  id: number;
  questionId: number;
  text: string;
  score: number;
  version: number;
  status: boolean;
}
