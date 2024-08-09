
export interface Domain {
  id: string,
  name: string,
  description: string,
  code: string,
  tag: string,
  idDomainCategory: string,
  idCompany: string,
  active?: boolean,
  delete?: boolean,
  subDomains?:SubDomain[]
}

export interface SubDomain {
  id:string,
  name: string,
  description: string,
  tag: string,
  idDomain: string,
  active?: boolean,
  delete?: boolean,
  status: string
}