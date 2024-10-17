export interface ServiceCategory{
  id?: string;
  idClient: string;
  name: string;
  description: string;
  tag: string;
  active: boolean;
  createdDate: Date;
  modificatedDate: Date;
  idGroupCompany?: string;
}