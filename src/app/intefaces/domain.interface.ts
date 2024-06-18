
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
  is_active: boolean,
  is_delete: boolean,
  created_date: string,
  modificated_date: string,
  tag: string,
  id_domain: string
}