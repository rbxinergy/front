export interface User {
    id: string;
    name: string;
    lastName: string;
    jobTitle: string;
    email: string;
    documentType: string;
    document: string;
    passwd: string;
    isProvider: boolean;
    isClient: boolean;
    isUserCompany: boolean;
    isActive: boolean;
    isDelete: boolean;
    createdDate: Date;
    modificatedDate: Date;
    tag: string;
    company: string;
  }