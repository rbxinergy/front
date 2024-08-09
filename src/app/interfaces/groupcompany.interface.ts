export interface GroupCompany {
    id: string;
    name: string;
    description: string;
    active?: boolean;
    delete?: boolean;
    createdDate?: Date;
    modificatedDate?: Date;
    tag: string;
    idClient?: string;
  }