export interface ServiceCompany {
    id: string;
    name: string;
    code: string;
    location: string;
    description: string;
    tag: string;
    active: boolean;
    createdDate: Date;
    modificatedDate: Date;
    idServiceCategory: string;
    idCompany: string;
    idContact: string[];
    idProvider: string[];
  }