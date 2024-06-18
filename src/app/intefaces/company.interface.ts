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
  isHeadquarters: boolean;
  isBranch: boolean;
  isActive: boolean;
  isDelete: boolean;
  created_date: Date;
  modificated_date: Date;
  tag: string;
  idGroupCompany: string;
  idClient: string;
}