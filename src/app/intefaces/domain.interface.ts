
export interface Domain {
  id: string,
  name: string,
  description: string,
  code: string,
  tag: string[],
  idDomainCategory: string,
  idCompany: string,
  subdomains: SubDomain[]
}

export interface SubDomain {
  name: string,
  description: string,
  tag: string,
  idDomain: string
}