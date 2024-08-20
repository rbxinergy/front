
export interface Domain {
  id?: string;
  name: string;
  description: string;
  code: string;
  tag: string;
  active?: boolean;
  createdDate?:string;
  modificatedDate?:string;
  idDomainCategory?: string;
  idCompany?: string;
  idServiceCompany?: string;
  subDomains: SubDomain[]
}

export interface SubDomain {
  id:string;
  name: string;
  description: string;
  tag: string;
  active?: boolean;
  idDomain: string;
  createdDate?:string;
  modificatedDate?:string;
}