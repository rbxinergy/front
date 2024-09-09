export interface Services {
    id: number,
    typeid: number,
    companyid: number,
    servicetype: string,
    servicename: string,
    description: string,
    documentGroup: string,
    companyname: string,
    createdAt: string,
    active: boolean
}

export interface ServiceType {
    id: number,
    documentGroup: string,
    name: string,
    description: string
}