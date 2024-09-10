export interface SubDomain {
    idSubDomain: number;
    subDomain:string;
    idDomain: number
    domainName:string;
    companyId: number;
    companyName:string;
    clientName: string;
}

export interface CompanySubDomain {
    documentGroup: string;
    subDomains: SubDomain[];
}