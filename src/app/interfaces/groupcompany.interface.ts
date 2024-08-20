export interface GroupCompany {
    id: string;
    name: string;
    description: string;
    tag: string;
    active?: boolean;
    createdDate?: Date;
    modificatedDate?: Date;
    idClient?: string;
  }