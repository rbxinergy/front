export interface Contact {
  id: string;
  name: string;
  lastName: string;
  surname: string;
  email: string;
  phone: string;
  cellphone: string;
  jobTitle: string;
  contactType: string;
  tag: string;
  active?: boolean;
  createdDate?:string;
  modificatedDate?:string;
  idServiceCompany: string [];
  idCompany?: string[];
  idClient?: string[];
  idProvider?: string[];
}