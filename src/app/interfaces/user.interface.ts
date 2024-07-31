export interface User {
    id: string;
    name: string;
    lastName: string;
    surname: string;
    jobTitle: string;
    email: string;
    phone:string;
    cellphone:string;
    contactType:string;
    documentType: string;
    document: string;
    passwd: string;
    isProvider: boolean;
    isClient: boolean;
    isUserCompany: boolean;
    active: boolean;
    delete: boolean;
    tag: string;
    idRole?: string;
    company?: string;
  }