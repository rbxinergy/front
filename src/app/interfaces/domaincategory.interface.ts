export interface DomainCategory {
  id: string;
  idClient: string;
  name: string;
  description: string;
  tag: string;
  active?: boolean;
  createdDate?:string;
  modificatedDate?:string;
  idGroupCompany?: string;
}