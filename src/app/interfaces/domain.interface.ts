
export interface Domain {
  id: string,
  name: string,
  description: string,
  code: string,
  tag: string,
  idDomainCategory: string,
  idCompany: string,
  active?: boolean,
  delete?: boolean
}

export interface SubDomain {
  id:string,
  name: string,
  description: string,
  tag: string,
  idDomain: string,
  is_active?: boolean,
  is_delete?: boolean,
  status: string
}