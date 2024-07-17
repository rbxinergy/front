export interface Users {
    firstName: string,
    lastName: string,
    position: string,
    email: string,
    companyname: string,
    acciones:string
}

export interface User{
    id: string,
    name: string,
    lastName: string,
    surename: string,
    passwd: string,
    documentType: string,
    document: string,
    email: string,
    isProvider: boolean,
    isClient: boolean,
    isUserCompany: boolean,
    jobTitle: string,
    tag: string,
    idRole: string[]
}
