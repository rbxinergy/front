export interface DomainCategory {
  id: string;
  name: string;
  description: string;
  tag: string;
  active?: boolean;
  createdDate?:string;
  modificatedDate?:string;
  idGroupCompany?: string;
}