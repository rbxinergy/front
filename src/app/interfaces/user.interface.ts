export interface User {
    id: string;
    name: string;
    lastName: string;
    jobTitle: string;
    email: string;
    tag:string;
    active?: boolean;
    createdDate?: Date;
    modificatedDate?: Date;
    idRole: string[];
    company?: string;
  }