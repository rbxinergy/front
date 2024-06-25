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
    passwd: string,
    lastName: string,
    isProvider: boolean,
    isClient: boolean,
    isUserCompany: boolean,
    jobTitle: string,
    email: string,
    documentType: string,
    document: string,
    tag: string,
    idRole: string[]
}
