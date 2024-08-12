export interface Company {
  id: string;
  name: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  county: string;
  district: string;
  country: string;
  documentType: string;
  document: string;
  headquarters: boolean;
  branch?: boolean;
  active?: boolean;
  tag: string;
  createdDate?: string;
  modificatedDate?: string;
  idGroupCompany: string;
  idClient: string;
  idContact?:string[]
}